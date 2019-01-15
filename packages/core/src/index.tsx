import {
  EditorContext,
  EditorUtilsContext,
  DocumentContext
} from '@splish-me/editor-core-contexts'
import { DocumentIdentifier, DocumentProps } from '@splish-me/editor-core-types'
import { blurAllCells } from 'ory-editor-core/lib/actions/cell'
import createDragDropContext from 'ory-editor-core/lib/components/DragDropContext'
import {
  enableGlobalBlurring,
  disableGlobalBlurring
} from 'ory-editor-core/lib/components/Editable/Inner/blur'
import { editable, editables } from 'ory-editor-core/lib/selector'
import {
  AbstractCell,
  AbstractEditable,
  Row
} from 'ory-editor-core/lib/types/editable'
import { Editor as E } from 'ory-editor-core'
import { throttle } from 'lodash'
import * as R from 'ramda'
import * as React from 'react'
import { Provider } from 'react-redux'
import { Action } from 'redux'

import { DocumentEditor, DocumentEditorProps } from './document-editor'
import { LinearHistory } from './linear-history'

export class Editor extends React.Component<EditorProps, EditorState> {
  constructor(props: EditorProps) {
    super(props)

    this.history = new LinearHistory([])
    this.editor = new E({
      defaultPlugin: props.defaultPlugin as any,
      plugins: {
        content: props.plugins as any[]
      },
      editables: [],
      // @ts-ignore
      middleware: [
        () => {
          return next => (action: Action) => {
            // FIXME:
            const ignoredActions = [
              'UPDATE_EDITABLE',
              'CELL_BLUR_ALL',
              'CELL_FOCUS',
              'SET_DISPLAY_MODE',
              'CELL_DRAG_HOVER',
              'CELL_CREATE_FALLBACK'
            ]

            if (ignoredActions.indexOf(action.type) === -1) {
              const state = editables(this.editor.store.getState())
              this.commitState(state)
            }

            return next(action)
          }
        }
      ]
    })

    this.editor.trigger.mode[props.mode as string]()
    this.state = { mode: props.mode }
    this.DragDropContext = createDragDropContext(this.editor.dragDropContext)
  }

  public render(): React.ReactNode {
    return (
      <Provider store={this.editor.store}>
        <this.DragDropContext>
          <EditorContext.Provider
            value={{
              editor: this.editor,
              changeMode: this.changeMode,
              currentMode: this.state.mode as string
            }}
          >
            <EditorUtilsContext.Provider
              value={{
                undo: this.undo,
                redo: this.redo,
                serializeState: this.serializeState
              }}
            >
              <DocumentContext.Provider value={this.Document}>
                {this.props.children}
              </DocumentContext.Provider>
            </EditorUtilsContext.Provider>
          </EditorContext.Provider>
        </this.DragDropContext>
      </Provider>
    )
  }

  public componentDidMount() {
    enableGlobalBlurring(this.blurAllCells)
  }

  public componentDidUpdate(prevProps: EditorProps): void {
    const { mode } = this.props

    if (mode !== prevProps.mode) {
      this.editor.trigger.mode[mode as string]()
    }
  }

  public componentWillUnmount() {
    disableGlobalBlurring(this.blurAllCells)
  }

  private readonly history: LinearHistory<Document[]>
  private readonly editor: E
  private readonly Document: React.ComponentType<DocumentProps> = (
    props: DocumentEditorProps
  ) => {
    return <DocumentEditor {...props} editor={this.editor} />
  }
  private readonly DragDropContext: React.ComponentType

  private readonly changeMode = (buttonMode: string) => {
    this.setState({ mode: buttonMode })
    this.editor.trigger.mode[buttonMode as string]()
  }

  private readonly undo = () => {
    this.setEditorState(this.history.undo())
  }

  private readonly redo = () => {
    this.setEditorState(this.history.redo())
  }

  private readonly serializeState = ({ id }: DocumentIdentifier): any => {
    const rootEditable = editable(this.editor.store.getState(), { id })
    const serializedRootEditable = this.editor.plugins.serialize(rootEditable)

    const hydrateSubeditables = (value: any): any => {
      if (value instanceof Object) {
        return R.map((v: any) => {
          if (v && v.type && v.type === 'splish.document') {
            return {
              type: '@splish-me/editor-core/editable',
              state: this.serializeState(v)
            }
          }

          return hydrateSubeditables(v)
        }, value)
      }

      return value
    }

    return hydrateSubeditables(serializedRootEditable)
  }

  private readonly commitState = throttle((state: Document[]) => {
    if (state.length > 0) {
      this.history.commit(state)
    }
  }, 300)

  private readonly blurAllCells = () => {
    this.editor.store.dispatch(blurAllCells())
  }

  private readonly setEditorState = (state: Document[] | null) => {
    if (state === null) {
      return
    }

    R.forEach(document => {
      this.editor.trigger.editable.update(document)
    }, state)
  }

  static defaultProps = {
    mode: 'edit'
  }
}

type Document = AbstractEditable<AbstractCell<Row>>

export interface EditorProps {
  defaultPlugin?: unknown
  plugins?: unknown[]
  mode?: unknown
}

interface EditorState {
  mode: unknown
}
