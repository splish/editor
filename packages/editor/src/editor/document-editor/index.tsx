import { editable } from 'ory-editor-core/lib/selector/editable'
import { createEmptyState, Editor } from 'ory-editor-core'
import * as React from 'react'
import * as R from 'ramda'

import { createDocumentIdentifier } from '../../document'
import { DocumentIdentifier, Plugin, State } from '../../types'
import { DocumentInner } from './inner'

export class DocumentEditor extends React.Component<DocumentEditorProps> {
  static defaultProps = {
    initialState: createEmptyState()
  }

  constructor(props: DocumentEditorProps) {
    super(props)
    const { editor, initialState } = props
    const state = editable(editor.store.getState(), { id: props.state.id })

    if (!state) {
      editor.trigger.editable.add({
        ...this.parseEditable(initialState),
        id: props.state.id
      })
    }
  }

  private parseEditable(editable: unknown) {
    const rootEditable = editable

    const hydrateSubeditables = (value: any): any => {
      if (value instanceof Object) {
        return R.map((v: any) => {
          if (v && v.type && v.type === '@splish-me/editor-core/editable') {
            this.props.editor.trigger.editable.add(hydrateSubeditables(v.state))

            return createDocumentIdentifier(v.state.id)
          }

          return hydrateSubeditables(v)
        }, value)
      }

      return value
    }

    return hydrateSubeditables(rootEditable)
  }

  public componentWillUnmount() {
    // FIXME: remove editable (not possible currently)
  }

  public render() {
    const { editor, defaultPlugin, state } = this.props

    return (
      <DocumentInner
        defaultPlugin={defaultPlugin || editor.defaultPlugin}
        id={state.id}
      />
    )
  }
}

export type DocumentEditorProps = {
  initialState?: State
  defaultPlugin?: Plugin<any>
  state: DocumentIdentifier
  editor: Editor
}
