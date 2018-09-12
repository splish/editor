import { parseFragment } from 'parse5'
import { Value, ValueJSON, MarkJSON, NodeJSON } from 'slate'
import Html, { Rule } from 'slate-html-serializer'
import { Plugin } from 'slate-react'

import { createSlateEditor } from './slate-editor.component'
import { slatePlugin } from './plugin'

export interface SerializeMarkProps {
  mark: MarkJSON
}

export interface SerializeNodeProps {
  node: NodeJSON
}

export interface SlatePluginOptions {
  defaultNode: string
  plugins: Array<Plugin & Rule>
  placeholder?: React.ReactNode
}

export type SlatePlugin = Plugin & Rule

export interface SlatePluginState {
  editorState: Value
}

export interface SlatePluginSerializedState {
  importFromHtml?: string
  editorState?: ValueJSON
}

export const createSlatePlugin = (options: SlatePluginOptions) => {
  const createInitialState = (): SlatePluginState => {
    return {
      editorState: Value.fromJSON({
        document: {
          nodes: [
            {
              object: 'block',
              type: options.defaultNode,
              nodes: [
                {
                  object: 'text',
                  leaves: [
                    {
                      text: ''
                    }
                  ]
                }
              ]
            }
          ]
        }
      })
    }
  }

  const lineBreakSerializer = {
    // @ts-ignore
    deserialize(el) {
      if (el.tagName.toLowerCase() === 'br') {
        return { object: 'text', text: '\n' }
      }

      if (el.nodeName === '#text') {
        if (el.value && el.value.match(/<!--.*?-->/)) return
        if (el.value === '\n') return

        return {
          object: 'text',
          leaves: [
            {
              object: 'leaf',
              text: el.value
            }
          ]
        }
      }

      return undefined
    }
  }

  // @ts-ignore
  const html = new Html({
    rules: [lineBreakSerializer, ...options.plugins],
    parseHtml: parseFragment
  })

  return {
    ...slatePlugin,
    Component: createSlateEditor(options),

    handleBlur: (props: {
      onChange: (state: SlatePluginState) => void
      state: SlatePluginState
    }) => {
      const { editorState } = props.state

      if (editorState.selection.isFocused) {
        return
      }

      props.onChange({
        editorState: editorState.change().blur().value
      })
    },

    createInitialState,

    unserialize({
      importFromHtml,
      editorState
    }: SlatePluginSerializedState): SlatePluginState {
      if (editorState) {
        return { editorState: Value.fromJSON(editorState) }
      } else if (importFromHtml) {
        try {
          const editorState = html.deserialize(importFromHtml, options)

          return { editorState }
        } catch (e) {
          console.log('Failed on', importFromHtml, e)
          return createInitialState()
        }
      }

      return createInitialState()
    },

    serialize({ editorState }: SlatePluginState): SlatePluginSerializedState {
      return {
        editorState: editorState.toJSON()
      }
    }
  }
}
