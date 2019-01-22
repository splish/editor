import * as React from 'react'
import { Value } from 'slate'
import { Plugin } from 'slate-react'
import { Rule } from 'slate-html-serializer'

export interface TextPluginOptions {
  plugins: Array<Plugin & Rule>
  placeholder?: React.ReactNode
}

export interface TextPluginState {
  editorState: Value
}
