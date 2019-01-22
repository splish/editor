import * as React from 'react'

import { DocumentIdentifier, DocumentProps, SerializedState } from './types'

export const EditorContext = React.createContext<
  | {
      editor: unknown
      changeMode: (mode: string) => void
      currentMode: string
    }
  | undefined
>(undefined)

export const EditorUtilsContext = React.createContext<{
  undo: () => void
  redo: () => void
  serializeState: (id: DocumentIdentifier) => SerializedState
}>({
  undo: () => {},
  redo: () => {},
  serializeState: () => {}
})

export const DocumentContext = React.createContext<
  React.ComponentType<DocumentProps>
>(() => null)
