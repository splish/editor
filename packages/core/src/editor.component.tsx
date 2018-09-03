import {
  createDragDropContext,
  Editor as E,
  selectors
  // @ts-ignore
} from '@splish-me/ory-editor-core'
import * as R from 'ramda'
import * as React from 'react'
import { Provider } from 'react-redux'
import { Store, Action, Dispatch } from 'redux'
import * as _ from 'lodash'

import {
  EditorProvider,
  EditorHelpersProvider,
  EditableProvider
} from './contexts'
import {
  RawEditable,
  EditableIdentifier,
  EditableProps,
  editableSymbol
} from './editable.component'

export interface EditorProps {
  defaultPlugin?: unknown
  plugins?: unknown[]
  mode?: unknown
}

interface EditorState {
  mode: unknown
}

export class Editor extends React.Component<EditorProps, EditorState> {
  static defaultProps = {
    mode: 'edit'
  }

  private undoStack: unknown[] = []
  private redoStack: unknown[] = []
  private editor: E
  private DragDropContext: React.ComponentType
  private persistState = _.throttle(state => {
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
    }, (newState as unknown[]) || [])
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
    }, (newState as unknown[]) || [])
  }

  public serializeState = ({ id }: EditableIdentifier): any => {
    const { editable } = selectors(this.editor.store)

    const rootEditable = editable(id)
    const serializedRootEditable = this.editor.plugins.serialize(rootEditable)

    const hydrateSubeditables = (value: any): any => {
      if (value instanceof Object) {
        return R.map((v: any) => {
          if (v && v.type && v.type === editableSymbol) {
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

  private Editable: React.ComponentType<EditableProps> = (
    props: EditableProps
  ) => {
    return <RawEditable {...props} editor={this.editor} />
  }

  constructor(props: EditorProps) {
    super(props)
    this.editor = new E({
      defaultPlugin: props.defaultPlugin,
      plugins: {
        content: props.plugins
      },
      editables: [],
      middleware: [
        (store: Store<unknown>) => {
          const { editables } = selectors(store)

          return (next: Dispatch<unknown>) => (action: Action) => {
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

    this.editor.trigger.mode[props.mode]()
    this.state = { mode: props.mode }
    this.DragDropContext = createDragDropContext(this.editor.dragDropContext)
  }

  public componentDidUpdate(prevProps: EditorProps) {
    const { mode } = this.props

    if (mode !== prevProps.mode) {
      this.editor.trigger.mode[mode]()
    }
  }
  public changeMode = (buttonMode: String) => {
    this.setState({ mode: buttonMode })
    this.editor.trigger.mode[buttonMode]()
  }

  public render() {
    return (
      <Provider store={this.editor.store}>
        <this.DragDropContext>
          <EditorProvider
            value={{
              editor: this.editor,
              changeMode: this.changeMode,
              currentMode: this.state.mode
            }}
          >
            <EditorHelpersProvider
              value={{
                undo: this.undo,
                redo: this.redo,
                serializeState: this.serializeState
              }}
            >
              <EditableProvider value={this.Editable}>
                {this.props.children}
              </EditableProvider>
            </EditorHelpersProvider>
          </EditorProvider>
        </this.DragDropContext>
      </Provider>
    )
  }
}
