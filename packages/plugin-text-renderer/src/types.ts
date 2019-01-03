import { ValueJSON } from 'slate'
import { Rule } from 'slate-html-serializer'

export interface TextRendererPluginOptions {
  plugins: Rule[]
}

export interface TextPluginSerializedState {
  importFromHtml?: string
  editorState?: ValueJSON
}
