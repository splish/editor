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

// FIXME
export type Plugin = unknown
// FIXME
export type State = unknown
// FIXME
export type SerializedState = unknown
