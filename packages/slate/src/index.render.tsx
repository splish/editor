import * as R from 'ramda'
import * as React from 'react'
import { Rule } from 'slate-html-serializer'

import { Renderer } from './slate-react-serializer'
import { slatePlugin } from './plugin'
import { SlatePluginSerializedState } from './state.interface'

export interface SlateRenderPluginOptions {
  plugins: Array<Rule>
}

export const createSlateRenderPlugin = (options: SlateRenderPluginOptions) => {
  return {
    ...slatePlugin,
    Component: ({ state }: { state: SlatePluginSerializedState }) => {
      return (
        <Renderer
          value={state.editorState}
          rules={R.map(plugin => plugin.serialize, options.plugins)}
        />
      )
    }
  }
}
