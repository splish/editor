import { blurAllCells } from 'ory-editor-core/lib/actions/cell'
import createDragDropContext from 'ory-editor-core/lib/components/DragDropContext'
import {
  disableGlobalBlurring,
  enableGlobalBlurring
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
import { HotKeys } from 'react-hotkeys'
import { Provider } from 'react-redux'
import { Action } from 'redux'

import { DocumentContext, EditorContext, EditorUtilsContext } from '../contexts'
import { DocumentIdentifier, DocumentProps } from '../types'
import { warn } from '@splish-me/editor-shared'
import { DocumentEditor } from './document-editor'
import { LinearHistory } from './linear-history'
import { PluginRegistry } from './plugin-registry'

export class Editor<K extends string = string> extends React.Component<
  EditorProps<K>,
  EditorState
> {
  constructor(props: EditorProps<K>) {
    super(props)

    warn(
      !Array.isArray(props.plugins),
      'Passing plugins as array is deprecated and will be removed in the next minor version. Pass a dictionary instead.'
    )

    let defaultPlugin: any
    let plugins: any[]

    if (Array.isArray(props.plugins)) {
      const pluginRegistryPlugins = {}
      plugins = props.plugins
      defaultPlugin = props.defaultPlugin

      plugins.forEach(plugin => {
        pluginRegistryPlugins[plugin['name']] = plugin
      })

      this.registry = new PluginRegistry<K>(pluginRegistryPlugins as Record<
        K,
        any
      >)
    } else {
      const deprecatedPlugins = R.mapObjIndexed((plugin, name) => {
        warn(
          typeof plugin['name'] === 'undefined',
          'Specifying a plugin name is deprecated and will be removed in the next minor version. Use the dictionary key instead'
        )
        warn(
          typeof plugin['version'] === 'undefined',
          'Specifying the version of a plugin is deprecated and will be removed in the next minor version.'
        )

        return {
          ...plugin,
          name,
          // TODO: workaround until next minor version where we remove version handling completely
          version: plugin['version'] || '999.0.0'
        }
      }, props.plugins)
      plugins = R.values(deprecatedPlugins)
      this.registry = new PluginRegistry<K>(deprecatedPlugins as Record<K, any>)
      defaultPlugin = deprecatedPlugins[props.defaultPlugin as K]
    }

    this.history = new LinearHistory([])
    this.editor = new E({
      defaultPlugin: defaultPlugin,
      plugins: {
        content: plugins
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
                <HotKeys
                  keyMap={{
                    UNDO: 'mod+z',
                    REDO: ['mod+y', 'mod+shift+z']
                  }}
                  handlers={{
                    UNDO: this.undo,
                    REDO: this.redo
                  }}
                >
                  {this.props.children}
                </HotKeys>
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
  private readonly registry: PluginRegistry<K>
  private readonly Document: React.ComponentType<DocumentProps<K>> = props => {
    const { defaultPlugin, state, ...rest } = props

    return (
      <DocumentEditor
        {...rest}
        state={state as DocumentIdentifier}
        defaultPlugin={this.registry.getPlugin(defaultPlugin)}
        editor={this.editor}
      />
    )
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
          if (v && v.$$typeof && v.$$typeof === 'splish.document') {
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

export type EditorProps<K extends string = string> = {
  mode?: unknown
} & (DeprecatedPluginRegistryProps | PluginRegistryProps<K>)

/**
 * @deprecated since version 0.4.6
 */
interface DeprecatedPluginRegistryProps {
  plugins: unknown[]
  defaultPlugin: unknown
}

interface PluginRegistryProps<K extends string = string> {
  plugins: Record<K, unknown>
  defaultPlugin: K
}

interface EditorState {
  mode: unknown
}
