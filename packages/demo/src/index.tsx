import { Editor } from '@splish-me/editor-core/src/editor.component'
import { createEditableIdentifier } from '@splish-me/editor-core/src/editable.component'
import { ModeToolbar } from '@splish-me/editor-ui/src/mode-toolbar.component'
import { AddSidebar } from '@splish-me/editor-ui/src/add-sidebar.component'
import { Sidebar } from '@splish-me/editor-ui/src/sidebar.component'
import * as React from 'react'
import { Trash } from 'ory-editor-ui'

import SidebarTextfield from '@splish-me/editor-ui/src/sidebar-elements/textfield'
import SidebarCheckbox from '@splish-me/editor-ui/src/sidebar-elements/checkbox'
import SidebarTextarea from '@splish-me/editor-ui/src/sidebar-elements/textarea'
import ButtonGroup from '@splish-me/editor-ui/src/sidebar-elements/button'
import { Button } from '@splish-me/editor-ui/src/sidebar-elements/button'
import SidebarDropDown from '@splish-me/editor-ui/src/sidebar-elements/dropdown'
import { Searchbar } from '@splish-me/editor-ui/src/searchbar/searchbar'
import SidebarText from '@splish-me/editor-ui/src/sidebar-elements/sidebartext'

// FIXME:
// TODO: remove ramda
import 'ory-editor-core/lib/index.css'
import 'ory-editor-ui/lib/index.css'
import {
  EditorConsumer,
  EditorHelpersConsumer
} from '@splish-me/editor-core/src/contexts'
import { Editable } from '.@splish-me/editor-core/src/editable.component'
import { PluginSidebar } from '@splish-me/editor-ui/src/plugin-sidebar.component'
import { injectGlobal } from 'emotion'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  `

require('react-tap-event-plugin')()

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
                          JSON.stringify(serializeState(rootId))
                        )
                      }}
                    >
                      Save
                    </button>
                  </React.Fragment>
                )}
              </EditorHelpersConsumer>
              <Trash editor={editor} />
              <ModeToolbar />
              <Sidebar
                active={currentMode !== 'preview'}
                hideToggle={currentMode === 'layout'}
              >
                {currentMode === 'layout' ? (
                  <AddSidebar />
                ) : (
                  <React.Fragment>
                    <SidebarTextfield
                      label="tesdsgae dgft:"
                      placeholder="testtest"
                      type="text"
                    />
                    <SidebarTextfield
                      label="num:"
                      placeholder="hint"
                      type="number"
                    />
                    <SidebarText>
                      Testtext Testtext Testtext TesttextTesttext Testtext
                      Testtext Testtext Testtext Testtext Testtext Testtext
                    </SidebarText>
                    <SidebarCheckbox
                      value={this.state.checkboxvalue}
                      label="check"
                      onChange={event => {
                        this.setState({
                          checkboxvalue: event.target.checked
                        })
                      }}
                    />
                    <ButtonGroup>
                      <Button
                        active
                        onClick={event => {
                          alert('Funktioniert')
                        }}
                      >
                        a
                      </Button>
                      <Button> b</Button>
                      <Button> c </Button>
                    </ButtonGroup>
                    <SidebarDropDown
                      label="dropdown"
                      options={['a', 'b', 'c', 'd']}
                    />
                    <SidebarTextarea
                      label="labeltest"
                      placeholder="Area for long texts"
                    />
                    <PluginSidebar />
                  </React.Fragment>
                )}
              </Sidebar>
            </React.Fragment>
          )}
        </EditorConsumer>
      </Editor>
    )
  }
}
