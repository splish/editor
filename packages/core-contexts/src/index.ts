import {
  DocumentIdentifier,
  DocumentProps,
  SerializedState
} from '@splish-me/editor-core-types'
import * as React from 'react'

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

const DocumentContext = React.createContext<React.ComponentType<DocumentProps>>(
  () => null
)
