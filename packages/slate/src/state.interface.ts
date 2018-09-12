import { Value, ValueJSON } from 'slate'

export interface SlatePluginState {
  editorState: Value
}

export interface SlatePluginSerializedState {
  importFromHtml?: string
  editorState?: ValueJSON
}
