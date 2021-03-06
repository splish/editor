import {
  createDocumentIdentifier,
  Document,
  Editor,
  EditorProps,
  EditorContext,
  EditorUtilsContext
} from '@splish-me/editor'
import {
  AddSidebar,
  ModeToolbar,
  PluginSidebar,
  Sidebar
} from '@splish-me/editor-ui'
import * as React from 'react'

// FIXME:
import 'ory-editor-core/lib/index.css'
// import { injectGlobal, css } from 'emotion'

// injectGlobal`
//   @import url('https://fonts.googleapis.com/css?family=Open+Sans');
//
//   body {
//     background: #efefef;
//     padding: 20px 40px;
//     margin: 0;
//   }
// `

export type DocumentProps<K extends string = string> = {
  initialState?: any
} & EditorProps<K>

export class DocumentStory<K extends string = string> extends React.Component<
  DocumentProps<K>
> {
  public render() {
    const { initialState, ...editorProps } = this.props
    const rootId = createDocumentIdentifier()

    return (
      <div
      // className={css({
      //   background: '#ffffff',
      //   padding: '10px 20px'
      // })}
      >
        <Editor<K> {...editorProps}>
          <Document initialState={initialState} state={rootId} />
          <EditorContext.Consumer>
            {props => {
              if (!props) {
                return null
              }

              const { currentMode } = props

              return (
                <React.Fragment>
                  {currentMode === 'preview' ? null : (
                    <EditorUtilsContext.Consumer>
                      {({ undo, redo, serializeState }) => (
                        <React.Fragment>
                          <button
                            onClick={() => {
                              undo()
                            }}
                          >
                            Undo
                          </button>
                          <button
                            onClick={() => {
                              redo()
                            }}
                          >
                            Redo
                          </button>
                          <button
                            onClick={() => {
                              console.log(
                                'state',
                                JSON.stringify({
                                  state: JSON.stringify(serializeState(rootId))
                                })
                              )
                            }}
                          >
                            Save
                          </button>
                        </React.Fragment>
                      )}
                    </EditorUtilsContext.Consumer>
                  )}
                  <ModeToolbar />
                  <Sidebar
                    active={currentMode !== 'preview'}
                    hideToggle={currentMode === 'layout'}
                  >
                    {currentMode === 'layout' ? (
                      <AddSidebar />
                    ) : (
                      <PluginSidebar />
                    )}
                  </Sidebar>
                </React.Fragment>
              )
            }}
          </EditorContext.Consumer>
        </Editor>
      </div>
    )
  }
}
