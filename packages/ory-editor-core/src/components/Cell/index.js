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
import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'

import Inner from './Inner'
import { shouldPureComponentUpdate } from '../../helper/shouldComponentUpdate'
import { editableConfig, node, purifiedNode } from '../../selector/editable'
import {
  isPreviewMode,
  isEditMode,
  isResizeMode,
  isInsertMode,
  isLayoutMode
} from '../../selector/display'
import { resizeCell, focusCell, blurAllCells } from '../../actions/cell'
import Resizable from './Resizable'

const gridClass = ({ node: { size }, isPreviewMode, isEditMode }) => {
  if (isPreviewMode || isEditMode) {
    return `ory-cell-${isPreviewMode || isEditMode ? 'sm' : 'xs'}-${size ||
      12} ory-cell-xs-12`
  }

  return `ory-cell-xs-${size || 12}`
}

const stopClick = isEditMode => e => (isEditMode ? e.stopPropagation() : null)

class Cell extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  props

  render() {
    const {
      id,
      rowWidth,
      rowHeight,
      updateDimensions,
      isResizeMode,
      isEditMode,
      node: { inline, resizable, hasInlineNeighbour, focused },
      isLayoutMode
    } = this.props

    return (
      <div
        className={classNames('ory-cell', gridClass(this.props), {
          'ory-cell-has-inline-neighbour': hasInlineNeighbour,
          [`ory-cell-inline-${inline || ''}`]: inline,
          // 'ory-cell-bring-to-front': inline, && (!isLayoutMode && !isInsertMode && !isResizeMode),
          'ory-cell-focused': focused,
          'ory-cell-resizing-overlay': isResizeMode,
          'ory-cell-bring-to-front': !isResizeMode && !isLayoutMode && inline // inline must not be active for resize/layout
        })}
        onClick={stopClick(isEditMode)}
      >
        {resizable && isLayoutMode ? (
          <Resizable
            {...this.props}
            id={id}
            rowWidth={rowWidth}
            rowHeight={rowHeight}
            updateDimensions={updateDimensions}
            node={this.props.node}
            steps={12}
            onChange={this.props.resizeCell}
          >
            <Inner {...this.props} styles={null} />
          </Resizable>
        ) : (
          <Inner {...this.props} styles={null} />
        )}
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isPreviewMode,
  isEditMode,
  isResizeMode,
  // required by sub-components
  isInsertMode,
  isLayoutMode,
  config: editableConfig,
  node: purifiedNode,
  rawNode: (state, props) => () => node(state, props)
})

const mapDispatchToProps = (dispatch, { id }) =>
  bindActionCreators(
    {
      resizeCell: resizeCell(id),
      focusCell: focusCell(id),
      blurAllCells
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cell)
