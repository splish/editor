import * as React from 'react'

export interface DocumentProps<K extends string = string> {
  defaultPlugin?: K
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

export type Plugin<S = undefined> = StatelessPlugin | StatefulPlugin<S>

interface StatelessPlugin<PluginState = undefined> {
  Component: React.ComponentType<PluginEditorProps<PluginState>>
  text: string
}

interface StatefulPlugin<PluginState = undefined>
  extends StatelessPlugin<PluginState> {
  createInitialState: () => PluginState
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
