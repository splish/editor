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
import { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pathOr } from 'ramda'
import Mousetrap from 'mousetrap'

import { undo, redo } from '../../actions/undo'
import { removeCell, focusCell, blurAllCells } from '../../actions/cell'
import { isEditMode } from '../../selector/display'
import { focus } from '../../selector/focus'
import {
  node,
  editable,
  editables,
  searchNodeEverywhere
} from '../../selector/editable'

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

if (Mousetrap && Mousetrap.prototype) {
  Mousetrap.prototype.stopCallback = () => false
}

let wasInitialized = false

class Decorator extends Component {
  componentDidMount() {
    if (!wasInitialized) {
      if (!Mousetrap) {
        return
      }

      Mousetrap.bind(['ctrl+z', 'command+z'], this.handlers.undo)
      Mousetrap.bind(
        ['ctrl+shift+z', 'ctrl+y', 'command+shift+z', 'command+y'],
        this.handlers.redo
      )
      Mousetrap.bind(['del', 'backspace'], this.handlers.remove)
      Mousetrap.bind(['down', 'right'], this.handlers.focusNext)
      Mousetrap.bind(['up', 'left'], this.handlers.focusPrev)
      wasInitialized = true
    }
  }

  props

  handlers = {
    undo: () => {
      const { id, undo } = this.props
      undo(id)
    },
    redo: () => {
      const { id, redo } = this.props
      redo(id)
    },

    // remove cells
    remove: e => {
      const { focus, removeCell, isEditMode } = this.props
      if (!isEditMode) {
        return
      }

      const { node: n } = this.props.searchNodeEverywhere(focus)
      hotKeyHandler(n, 'handleRemoveHotKey')(e, n)
        .then(() => removeCell(focus))
        .catch(falser)
    },

    // focus next cell
    focusNext: e => {
      const { focus, focusCell, blurAllCells, isEditMode } = this.props
      if (!isEditMode) {
        return
      }

      const { node: n, editable } = this.props.searchNodeEverywhere(focus)
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
      const { focus, focusCell, blurAllCells, isEditMode } = this.props
      if (!isEditMode) {
        return
      }

      const { node: n, editable } = this.props.searchNodeEverywhere(focus)
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

  render() {
    const { children } = this.props
    return children
  }
}

const mapStateToProps = createStructuredSelector({
  isEditMode,
  focus,
  node: state => (id, editable) => node(state, { id, editable }),
  searchNodeEverywhere: state => id => searchNodeEverywhere(state, id),
  editable: (state, props) => id => editable(state, id ? { id } : props),
  editables
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
