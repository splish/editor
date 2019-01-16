import * as React from 'react'

export interface DocumentProps {
  defaultPlugin?: Plugin
  initialState?: State
  state: DocumentIdentifier | SerializedDocument
}

export interface DocumentIdentifier {
  $$typeof: 'splish.document'
  id: string
}

export interface SerializedDocument {
  type: '@splish-me/editor-core/editable'
  state: SerializedState
}

export interface Plugin<PluginState = undefined> {
  Component: React.ComponentType<PluginEditorProps<PluginState>>
}

export interface RendererPlugin<PluginState = undefined> {
  Component: React.ComponentType<PluginRendererProps<PluginState>>
}

export interface PluginEditorProps<PluginState = undefined> {
  state: PluginState
  onChange: (state: Partial<PluginState>) => void
  editable?: boolean
  focused?: boolean
  preview?: boolean
}

export interface PluginRendererProps<PluginState = undefined> {
  state: PluginState
}

// FIXME
export type State = unknown
// FIXME
export type SerializedState = unknown
