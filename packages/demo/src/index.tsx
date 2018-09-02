import { Editor } from '@splish-me/editor-core/src/editor.component'
import { createEditableIdentifier } from '@splish-me/editor-core/src/editable.component'
import { ModeToolbar } from '@splish-me/editor-ui/src/mode-toolbar.component'
import { AddSidebar } from '@splish-me/editor-ui/src/add-sidebar.component'
import { Sidebar } from '@splish-me/editor-ui/src/sidebar.component'
import * as React from 'react'

import { Editable } from '@splish-me/editor-core/src/editable.component'
import SidebarTextfield from '@splish-me/editor-ui/src/sidebar-elements/textfield'
import SidebarCheckbox from '@splish-me/editor-ui/src/sidebar-elements/checkbox'
import SidebarTextarea from '@splish-me/editor-ui/src/sidebar-elements/textarea'
import ButtonGroup from '@splish-me/editor-ui/src/sidebar-elements/button'
import { Button } from '@splish-me/editor-ui/src/sidebar-elements/button'
import SidebarDropDown from '@splish-me/editor-ui/src/sidebar-elements/dropdown'
import { Searchbar } from '@splish-me/editor-ui/src/searchbar/searchbar'
import SidebarText from '@splish-me/editor-ui/src/sidebar-elements/sidebartext'

// FIXME:
import 'ory-editor-core/lib/index.css'
import {
  EditorConsumer,
  EditorHelpersConsumer
} from '@splish-me/editor-core/src/contexts'
import { PluginSidebar } from '@splish-me/editor-ui/src/plugin-sidebar.component'
import { injectGlobal } from 'emotion'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');
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
      <Editor {...editorProps}>
        <Searchbar />
        <Editable initialState={initialState} id={rootId} />
        <EditorConsumer>
          {({ editor, currentMode }) => (
            <React.Fragment>
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
              <ModeToolbar />
              <Sidebar
                active={currentMode !== 'preview'}
                hideToggle={currentMode === 'layout'}
              >
                {currentMode === 'layout' ? <AddSidebar /> : <PluginSidebar />}
              </Sidebar>
            </React.Fragment>
          )}
        </EditorConsumer>
      </Editor>
    )
  }
}
