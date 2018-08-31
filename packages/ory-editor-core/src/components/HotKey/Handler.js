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
import React from 'react'
import { HotKeys } from 'react-hotkeys'
import { connect } from 'react-redux'
import { pathOr } from 'ramda'
import { createStructuredSelector } from 'reselect'

import { undo, redo } from '../../actions/undo'
import { removeCell, focusCell, blurAllCells } from '../../actions/cell'
import { isEditMode } from '../../selector/display'
import { focus } from '../../selector/focus'
import { node, editable } from '../../selector/editable'

const hotKeyHandler = (n, key) =>
  pathOr(
    pathOr(() => Promise.resolve(), ['content', 'plugin', key], n),
    ['layout', 'plugin', key],
    n
  )

const nextLeaf = (order = [], current) => {
  let last

  return order.find(c => {
    if (last === current) {
      return c.isLeaf
    }
    last = c.id
    return false
  })
}

const previousLeaf = (order, current) => nextLeaf([...order].reverse(), current)

const falser = err => {
  if (err) {
    console.log(err)
  }
}

// TODO cleanup and tests #143
const handlers = props => {
  const {
    id,
    undo,
    redo,
    focus,
    removeCell,
    focusCell,
    blurAllCells,
    isEditMode,
    node,
    editable
  } = props
  return {
    undo: () => undo(id),
    redo: () => redo(id),

    // remove cells
    remove: e => {
      if (!isEditMode) {
        return
      }

      const n = node(focus, id)
      hotKeyHandler(n, 'handleRemoveHotKey')(e, n)
        .then(() => removeCell(focus))
        .catch(falser)
    },

    // focus next cell
    focusNext: e => {
      if (!isEditMode) {
        return
      }

      const n = node(focus, id)
      hotKeyHandler(n, 'handleFocusNextHotKey')(e, n)
        .then(() => {
          const found = nextLeaf(editable.cellOrder, focus)
          if (found) {
            blurAllCells()
            focusCell(found.id)
          }
        })
        .catch(falser)
    },

    // focus previous cell
    focusPrev: e => {
      if (!isEditMode) {
        return
      }

      const n = node(focus, id)
      hotKeyHandler(n, 'handleFocusPreviousHotKey')(e, n)
        .then(() => {
          const found = previousLeaf(editable.cellOrder, focus)
          if (found) {
            blurAllCells()
            focusCell(found.id)
          }
        })
        .catch(falser)
    }
  }
}

const Decorator = props => (
  <HotKeys handlers={handlers(props)} style={{ outline: 'none' }}>
    {props.children}
  </HotKeys>
)

const mapStateToProps = createStructuredSelector({
  isEditMode,
  focus,
  node: state => (id, editable) => node(state, { id, editable }),
  editable: (state, props) => editable(state, props)
})

const mapDispatchToProps = {
  undo,
  redo,
  removeCell,
  focusCell: id => focusCell(id)(),
  blurAllCells
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Decorator)
