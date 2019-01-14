import createClassName from 'classnames'
import {
  BlurAllCellsAction,
  FocusCellAction
} from 'ory-editor-core/lib/actions/cell/core'
import {
  resizeCell,
  focusCell,
  blurAllCells,
  ResizeCellAction
} from 'ory-editor-core/lib/actions/cell'
import Resizable from 'ory-editor-core/lib/components/Cell/Resizable'
import {
  isPreviewMode,
  isEditMode,
  isResizeMode,
  isInsertMode,
  isLayoutMode
} from 'ory-editor-core/lib/selector/display'
import {
  editableConfig,
  node,
  purifiedNode,
  NodeProps
} from 'ory-editor-core/lib/selector/editable'
import { RootState } from 'ory-editor-core/lib/selector'
import { ComponetizedCell } from 'ory-editor-core/lib/types/editable'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { createStructuredSelector } from 'reselect'

import { CellInner } from './inner'

const gridClass = ({ node: { size }, ...rest }: ComponetizedCell): string => {
  if (rest.isPreviewMode || rest.isEditMode) {
    return `ory-cell-${
      rest.isPreviewMode || rest.isEditMode ? 'sm' : 'xs'
    }-${size || 12} ory-cell-xs-12`
  }

  return `ory-cell-xs-${size || 12}`
}

const stopClick = (_isEditMode: boolean) => (
  e: React.MouseEvent<HTMLDivElement>
) => (_isEditMode ? e.stopPropagation() : null)

type CellProps = ComponetizedCell

const mapStateToProps = createStructuredSelector({
  isPreviewMode,
  isEditMode,
  isResizeMode,
  // required by sub-components
  isInsertMode,
  isLayoutMode,
  config: editableConfig,
  node: purifiedNode,
  rawNode: (state: RootState, props: NodeProps) => () => node(state, props)
})

const mapDispatchToProps = (
  dispatch: Dispatch<ResizeCellAction | FocusCellAction | BlurAllCellsAction>,
  { id }: { id: string }
) =>
  bindActionCreators(
    {
      resizeCell: resizeCell(id),
      focusCell: focusCell(id),
      blurAllCells
    },
    dispatch
  )

export const Cell = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class Cell extends React.PureComponent<CellProps> {
    render() {
      const {
        node: { inline, hasInlineNeighbour, focused }
      } = this.props

      const resizable =
        (node as { resizable?: boolean }).resizable && this.props.isResizeMode
      const Container = resizable ? Resizable : React.Fragment
      const containerProps = resizable
        ? {
            ...this.props,
            steps: 12,
            onChange: this.props.resizeCell
          }
        : {}

      return (
        <div
          className={createClassName('ory-cell', gridClass(this.props), {
            'ory-cell-has-inline-neighbour': hasInlineNeighbour,
            [`ory-cell-inline-${inline || ''}`]: inline,
            'ory-cell-focused': focused,
            'ory-cell-resizing-overlay': this.props.isResizeMode,
            'ory-cell-bring-to-front':
              !this.props.isResizeMode && !this.props.isLayoutMode && inline // inline must not be active for resize/layout
          })}
          onClick={stopClick(this.props.isEditMode)}
        >
          <Container {...containerProps}>
            <CellInner {...this.props} styles={null} />
          </Container>
        </div>
      )
    }
  }
)
