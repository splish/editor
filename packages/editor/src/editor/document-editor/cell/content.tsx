import {
  updateCellContent,
  UpdateCellContentAction
} from 'ory-editor-core/lib/actions/cell'
import {
  isEditMode,
  isLayoutMode,
  isPreviewMode,
  isInsertMode,
  isResizeMode
} from 'ory-editor-core/lib/selector/display'
import { ContentPluginProps } from 'ory-editor-core/lib/service/plugin/classes'
import { ComponetizedCell } from 'ory-editor-core/lib/types/editable'
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { createStructuredSelector } from 'reselect'

const mapStateToProps = createStructuredSelector({
  isEditMode,
  isLayoutMode,
  isPreviewMode,
  isInsertMode,
  isResizeMode
})

const mapDispatchToProps = (
  dispatch: Dispatch<UpdateCellContentAction>,
  { id }: ComponetizedCell
) =>
  bindActionCreators(
    {
      updateCellContent: updateCellContent(id)
    },
    dispatch
  )

export const Content = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class Content extends React.PureComponent<ComponetizedCell> {
    private ref: HTMLDivElement

    componentWillReceiveProps(nextProps: ComponetizedCell) {
      const {
        node: { focused: was }
      } = this.props
      const {
        node: { focused: is, focusSource }
      } = nextProps
      const {
        editable,
        id,
        node: {
          content: {
            plugin: {
              handleFocus = () => null,
              handleBlur = () => null,
              name = 'N/A',
              version = 'N/A'
            } = {},
            state = {}
          } = {},
          focused
        }
      } = nextProps

      // FIXME this is really shitty because it will break when the state changes before the blur comes through, see #157
      // tslint:disable-next-line:no-any
      const pass: ContentPluginProps = {
        editable,
        id,
        state,
        focused: this.props.isEditMode && focused,
        readOnly: !isEditMode,
        onChange: this.props.updateCellContent,
        name,
        version,
        isEditMode: nextProps.isEditMode,
        isResizeMode: nextProps.isResizeMode,
        isPreviewMode: nextProps.isPreviewMode,
        isInsertMode: nextProps.isInsertMode,
        isLayoutMode: nextProps.isLayoutMode
      }

      // Basically we check if the focus state changed and if yes, we execute the callback handler from the plugin, that
      // can set some side effects.
      if (!was && is) {
        // We need this because otherwise we lose hotkey focus on elements like spoilers.
        // This could probably be solved in an easier way by listening to window.document?
        handleFocus(pass, focusSource, this.ref)
      } else if (was && !is) {
        handleBlur(pass)
      }
    }

    onRef = (ref: HTMLDivElement) => {
      this.ref = ref
    }

    render() {
      const {
        editable,
        id,
        node: {
          content: {
            plugin: {
              Component = () => null,
              name = 'N/A',
              version = 'N/A'
            } = {},
            state = {}
          } = {},
          focused
        }
      } = this.props
      const { focusCell, blurCell } = this.props

      let focusProps
      if (!this.props.isPreviewMode) {
        focusProps = {
          onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => {
            if (
              !focused &&
              (e.target as HTMLDivElement).closest('.ory-cell-inner') ===
                findDOMNode(this.ref)
            ) {
              focusCell({ source: 'onMouseDown' })
            }

            return true
          }
        }
      }

      return (
        <div
          {...focusProps}
          tabIndex="-1"
          style={{ outline: 'none' }}
          ref={this.onRef}
          className="ory-cell-inner ory-cell-leaf"
        >
          <Component
            editable={editable}
            id={id}
            state={state}
            focused={this.props.isEditMode && focused}
            name={name}
            version={version}
            readOnly={!this.props.isEditMode}
            onChange={this.props.updateCellContent}
            focus={focusCell}
            blur={blurCell}
            isInsertMode={this.props.isInsertMode}
            isResizeMode={this.props.isResizeMode}
            isPreviewMode={this.props.isPreviewMode}
            isEditMode={this.props.isEditMode}
            isLayoutMode={this.props.isLayoutMode}
          />
        </div>
      )
    }
  }
)
