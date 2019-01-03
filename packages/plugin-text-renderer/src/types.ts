import { TextPlugin } from '@splish-me/editor-plugin-text-plugin'
import { ValueJSON } from 'slate'

export interface TextPluginRendererOptions {
  plugins: TextPlugin[]
}

export interface TextPluginSerializedState {
  importFromHtml?: string
  editorState?: ValueJSON
}
