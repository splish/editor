import {
  EditorContext,
  EditorUtilsContext
} from '@splish-me/editor-core-contexts'
import { Editor } from '@splish-me/editor-core'
import {
  createDocumentIdentifier,
  Document
} from '@splish-me/editor-core-document'
// import { ModeToolbar } from '@splish-me/editor-ui/lib/mode-toolbar.component'
// import { AddSidebar } from '@splish-me/editor-ui/lib/add-sidebar.component'
import { Sidebar } from '@splish-me/editor-ui-sidebar'
import { PluginSidebar } from '@splish-me/editor-ui-plugin-sidebar'
import * as React from 'react'

// FIXME:
// import 'ory-editor-core/lib/index.css'
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

export interface DocumentProps {
  initialState?: any
  defaultPlugin?: any
  plugins?: any[]
  mode?: any
}

export class DocumentStory extends React.Component<DocumentProps> {
  state = {
    checkboxvalue: false,
    buttonvalue: false
  }

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
        <Editor {...editorProps}>
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
                  {/*<ModeToolbar />*/}
                  <Sidebar
                    active={currentMode !== 'preview'}
                    hideToggle={currentMode === 'layout'}
                  >
                    {currentMode === 'layout' ? null : ( // <AddSidebar />
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
