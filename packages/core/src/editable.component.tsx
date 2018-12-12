/**
 * Nestable editable
 */
import {
  createEmptyState,
  Editor,
  selectors,
  Inner
} from '@splish-me/ory-editor-core'
import * as R from 'ramda'
import * as React from 'react'
import * as uuid from 'uuid'

import { EditableConsumer } from './contexts'

export const editableSymbol = Symbol('editable')

export interface EditableIdentifier {
  type: symbol
  id: string
}

export const createEditableIdentifier = (
  id = uuid.v4()
): EditableIdentifier => {
  return {
    type: editableSymbol,
    id
  }
}

type State = any // FIXME
type Plugin = any // FIXME

export interface EditableProps {
  defaultPlugin?: Plugin
  initialState?: State
  id: EditableIdentifier | State
}

export class Editable extends React.Component<EditableProps> {
  state = { error: null }

  public render() {
    if (this.state.error) {
      return (
        <React.Fragment>
          <p>Something wen't wrong. Ask a Serlo developer to help you ;)</p>
          <button onClick={() => this.setState({ error: null })}>Retry</button>
        </React.Fragment>
      )
    }

    return (
      <EditableConsumer>
        {Inner => {
          return <Inner {...this.props} />
        }}
      </EditableConsumer>
    )
  }

  componentDidCatch(error: Error, info: unknown) {
    console.log('catched error', error, info)
    this.setState({ error })
  }
}

interface RawEditableProps extends EditableProps {
  editor: Editor
}

export class RawEditable extends React.Component<RawEditableProps> {
  static defaultProps: Partial<RawEditableProps> = {
    initialState: createEmptyState()
  }

  constructor(props: RawEditableProps) {
    super(props)
    const { editor, id, initialState } = props

    const { editable } = selectors(editor.store)
    const state = editable(id.id)

    if (!state) {
      this.props.editor.trigger.editable.add({
        ...this.parseEditable(initialState),
        id: id.id
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

            return createEditableIdentifier(v.state.id)
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
    const { editor, defaultPlugin, id } = this.props

    return (
      <Inner defaultPlugin={defaultPlugin || editor.defaultPlugin} id={id.id} />
    )
  }
}
