import {
  EditorContext,
  EditorUtilsContext,
  DocumentContext
} from '@splish-me/editor-core-contexts'
import { DocumentIdentifier, DocumentProps } from '@splish-me/editor-core-types'
import {
  AbstractEditable,
  AbstractCell,
  Row
} from '@splish-me/ory-editor-core/dist/types/editable'
import { RootState } from '@splish-me/ory-editor-core/dist//types/state'
import {
  Editor as E,
  createDragDropContext,
  selectors
} from '@splish-me/ory-editor-core'
import { throttle } from 'lodash'
import * as R from 'ramda'
import * as React from 'react'
import { Provider } from 'react-redux'
import { Store, Action } from 'redux'

import { DocumentEditor, DocumentEditorProps } from './document-editor'

export class Editor extends React.Component<EditorProps, EditorState> {
  static defaultProps = {
    mode: 'edit'
  }

  private undoStack: Editable[][] = []
  private redoStack: Editable[][] = []
  private editor: E
  private DragDropContext: React.ComponentType
  private persistState = throttle((state: Editable[]) => {
    if (state.length > 0) {
      this.undoStack.push(state)
      this.redoStack = []
    }
  }, 300)

  private undo = () => {
    const { editables } = selectors(this.editor.store)
    const currentState = editables()
    const newState = this.undoStack.pop()

    if (currentState.length > 0 && newState) {
      this.redoStack.push(currentState)
    }

    R.forEach(editable => {
      this.editor.trigger.editable.update(editable)
    }, newState || [])
  }

  private redo = () => {
    const { editables } = selectors(this.editor.store)
    const currentState = editables()
    const newState = this.redoStack.pop()

    if (currentState.length > 0 && newState) {
      this.undoStack.push(currentState)
    }

    R.forEach(editable => {
      this.editor.trigger.editable.update(editable)
    }, newState || [])
  }

  public serializeState = ({ id }: DocumentIdentifier): any => {
    const { editable } = selectors(this.editor.store)

    const rootEditable = editable(id)
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

  private Document: React.ComponentType<DocumentProps> = (
    props: DocumentEditorProps
  ) => {
    return <DocumentEditor {...props} editor={this.editor} />
  }

  constructor(props: EditorProps) {
    super(props)
    this.editor = new E({
      defaultPlugin: props.defaultPlugin as any,
      plugins: {
        content: props.plugins as any[]
      },
      editables: [],
      middleware: [
        store => {
          const { editables } = selectors(store as Store<RootState>)

          return next => (action: Action) => {
            // FIXME:
            const ignoredActions = [
              'UPDATE_EDITABLE',
              'CELL_BLUR_ALL',
              'CELL_FOCUS',
              'SET_DISPLAY_MODE',
              'CELL_DRAG_HOVER'
            ]

            if (ignoredActions.indexOf(action.type) === -1) {
              this.persistState(editables())
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

  public componentDidUpdate(prevProps: EditorProps) {
    const { mode } = this.props

    if (mode !== prevProps.mode) {
      this.editor.trigger.mode[mode as string]()
    }
  }
  public changeMode = (buttonMode: string) => {
    this.setState({ mode: buttonMode })
    this.editor.trigger.mode[buttonMode as string]()
  }

  public render() {
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
}

type Editable = AbstractEditable<AbstractCell<Row>>

export interface EditorProps {
  defaultPlugin?: unknown
  plugins?: unknown[]
  mode?: unknown
}

interface EditorState {
  mode: unknown
}
