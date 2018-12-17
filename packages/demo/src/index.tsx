import { Editor } from '@splish-me/editor-core/lib/editor.component'
import { createEditableIdentifier } from '@splish-me/editor-core/lib/editable.component'
import { ModeToolbar } from '@splish-me/editor-ui/lib/mode-toolbar.component'
import { AddSidebar } from '@splish-me/editor-ui/lib/add-sidebar.component'
import { Sidebar } from '@splish-me/editor-ui/lib/sidebar.component'
import * as React from 'react'

import { Editable } from '@splish-me/editor-core/lib/editable.component'

// FIXME:
import 'ory-editor-core/lib/index.css'
import {
  EditorConsumer,
  EditorHelpersConsumer
} from '@splish-me/editor-core/lib/contexts'
import { PluginSidebar } from '@splish-me/editor-ui/lib/plugin-sidebar.component'
import { injectGlobal, css } from 'emotion'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');

  body {
    background: #efefef;
    padding: 20px 40px;
    margin: 0;
  }
`

export interface EditableProps {
  initialState?: any
  defaultPlugin?: any
  plugins?: any[]
  mode?: any
}

export class EditableStory extends React.Component<EditableProps> {
  state = {
    checkboxvalue: false,
    buttonvalue: false
  }

  public render() {
    const { initialState, ...editorProps } = this.props
    const rootId = createEditableIdentifier()

    return (
      <div
        className={css({
          background: '#ffffff',
          padding: '10px 20px'
        })}
      >
        <Editor {...editorProps}>
          <Editable initialState={initialState} id={rootId} />
          <EditorConsumer>
            {({ currentMode }) => (
              <React.Fragment>
                {currentMode === 'preview' ? null : (
                  <EditorHelpersConsumer>
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
                  </EditorHelpersConsumer>
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
            )}
          </EditorConsumer>
        </Editor>
      </div>
    )
  }
}
