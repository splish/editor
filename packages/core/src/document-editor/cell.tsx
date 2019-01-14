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
import Inner from 'ory-editor-core/lib/components/Cell/Inner'
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
import classNames from 'classnames'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { createStructuredSelector } from 'reselect'

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
        id,
        rowWidth,
        rowHeight,
        updateDimensions,
        node: { inline, resizable, hasInlineNeighbour, focused }
      } = this.props

      return (
        <div
          className={classNames('ory-cell', gridClass(this.props), {
            'ory-cell-has-inline-neighbour': hasInlineNeighbour,
            [`ory-cell-inline-${inline || ''}`]: inline,
            'ory-cell-focused': focused,
            'ory-cell-resizing-overlay': this.props.isResizeMode,
            'ory-cell-bring-to-front':
              !this.props.isResizeMode && !this.props.isLayoutMode && inline // inline must not be active for resize/layout
          })}
          onClick={stopClick(this.props.isEditMode)}
        >
          {resizable && this.props.isResizeMode ? (
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
)
