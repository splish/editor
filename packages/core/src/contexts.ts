// @ts-ignore
import { Editor } from '@splish-me/ory-editor-core'
import * as React from 'react'

import { EditableIdentifier, EditableProps } from './editable.component'

export const {
  Provider: EditorProvider,
  Consumer: EditorConsumer
} = React.createContext<Editor>(undefined)

export const {
  Provider: EditorHelpersProvider,
  Consumer: EditorHelpersConsumer
} = React.createContext<{
  undo: () => void
  redo: () => void
  serializeState: (id: EditableIdentifier) => any
}>({
  undo: () => {},
  redo: () => {},
  serializeState: () => {}
})

export const {
  Provider: EditableProvider,
  Consumer: EditableConsumer
} = React.createContext<React.ComponentType<EditableProps>>(() => null)
