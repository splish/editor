import * as React from 'react'
import { Change } from 'slate'
import { Editor, findNode } from 'slate-react'

import { TextPluginState, TextPluginOptions } from './types'

export interface SlateEditorProps {
  focused: boolean
  readOnly: boolean
  onChange: (state: Partial<TextPluginState>) => void
  state: TextPluginState
}

export const createTextEditor = (
  options: TextPluginOptions
): React.ComponentType<SlateEditorProps> => {
  return class SlateEditor extends React.Component<SlateEditorProps> {
    public render() {
      const { onChange, readOnly, focused, state } = this.props

      return (
        // @ts-ignore FIXME:
        <Editor
          onClick={(e, change): Change | void => {
            // @ts-ignore
            const node = findNode(e.target, change.value)

            // If we can't find the node (e.g. because we clicked in the sidebar), ignore core plugins to avoid throwing erros
            if (!node) {
              e.preventDefault()
              // @ts-ignore FIXME
              return change
            }
          }}
          // @ts-ignore FIXME
          onChange={(change?: Change) => {
            if (change) {
              onChange({ editorState: change.value })
            }
          }}
          // TODO: we might need custom `onKeyDown`
          placeholder={options.placeholder}
          plugins={options.plugins}
          readOnly={readOnly}
          // @ts-ignore FIXME
          value={state.editorState}
          onBlur={(_e, change) => change}
          // @ts-ignore Additional props for ui plugin
          focused={focused}
        />
      )
    }
  }
}
