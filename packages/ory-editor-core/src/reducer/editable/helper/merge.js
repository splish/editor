/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0-or-later
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 * @copyright 2018 Splish UG (haftungsbeschränkt)
 * @author Splish UG (haftungsbeschränkt)
 */
import { flatten } from 'ramda'
import { head } from 'ramda'
import { path } from 'ramda'
import { pathOr } from 'ramda'
import { map } from 'ramda'
import { reduce } from 'ramda'
import { tail } from 'ramda'
import { takeWhile } from 'ramda'

import { SET_DISPLAY_MODE } from '../../../actions/display'

const notSharp = c => c !== '#'

const takeWhileNotSharp = id => {
  const ids = takeWhile(notSharp, id)

  if (typeof ids === 'string') {
    return ids
  }

  return ids.join('')
}

export const mergeRows = state => {
  if (state.length < 2) {
    return state
  }

  const [newCellsAcc, lastRow] = reduce(
    ([rowsAcc, rowA], rowB) => {
      const numberOfCells = path(['cells', 'length'])

      const ids = takeWhile(notSharp, rowA.id)

      if (numberOfCells(rowA) !== 1 || numberOfCells(rowB) !== 1) {
        return [
          [
            ...rowsAcc,
            { ...rowA, id: typeof ids === 'string' ? ids : ids.join('') }
          ],
          rowB
        ]
      }

      const cellA = rowA.cells[0]
      const cellB = rowB.cells[0]

      const pluginName = path(['content', 'plugin', 'name'])
      const pluginVersion = path(['content', 'plugin', 'version'])
      const pluginMerge = path(['content', 'plugin', 'merge'])

      if (
        !pluginName(cellA) ||
        !pluginName(cellB) ||
        !pluginVersion(cellA) ||
        !pluginVersion(cellB) ||
        pluginName(cellA) !== pluginName(cellB) ||
        pluginVersion(cellA) !== pluginVersion(cellB) ||
        !pluginMerge(cellA)
      ) {
        return [[...rowsAcc, { ...rowA, id: takeWhileNotSharp(rowA.id) }], rowB]
      }

      return [
        rowsAcc,
        {
          ...rowA,
          id: takeWhileNotSharp(rowA.id),
          cells: [
            {
              ...cellA,
              id: takeWhileNotSharp(cellA.id),
              content: {
                ...cellA.content,
                state: pluginMerge(cellA)([
                  pathOr({}, ['content', 'state'], cellA),
                  pathOr({}, ['content', 'state'], cellB)
                ])
              }
            }
          ]
        }
      ]
    },
    [[], head(state)],
    tail(state)
  )

  return [...newCellsAcc, lastRow]
}

export const splitRows = state =>
  flatten(
    map(row => {
      if (!row.cells) {
        return [row]
      }

      if (row.cells.length !== 1) {
        return [row]
      }

      const state = path(['cells', 0, 'content', 'state'], row)
      const split = path(['cells', 0, 'content', 'plugin', 'split'], row)

      if (!split) {
        return [row]
      }

      return split(state).map((state, i) => ({
        ...row,
        id: `${row.id}#${i}`,
        cells: [
          {
            ...row.cells[0],
            id: `${row.cells[0].id}#${i}`,
            content: {
              ...row.cells[0].content,
              state
            }
          }
        ]
      }))
    }, state)
  )

export const mergeDecorator = action => state => {
  if (action.type !== SET_DISPLAY_MODE) {
    return state
  }

  switch (action.mode) {
    case 'edit':
      return mergeRows(state)
    case 'insert':
    case 'layout': {
      return splitRows(state)
    }
    default:
      return state
  }
}
