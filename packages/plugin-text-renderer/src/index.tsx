import * as React from 'react'

import { Renderer } from './renderer'
import * as t from './types'

export * from './types'

export const createTextRendererPlugin = (options: t.TextRendererPluginOptions) => {
  return {
    Component: ({ state }: { state: t.TextPluginSerializedState }) => {
      return (
        <Renderer
          value={state.editorState}
          rules={options.plugins.map(plugin => plugin.serialize)}
        />
      )
    }
  }
}
