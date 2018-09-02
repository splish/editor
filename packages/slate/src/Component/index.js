/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

/* eslint-disable no-alert, prefer-reflect, no-underscore-dangle */
import { renderIntoSidebar } from '@splish-me/editor-ui/src/plugin-sidebar.component'
import { createMuiTheme } from '@material-ui/core/styles'
import React, { Component } from 'react'
import { Portal } from 'react-portal'
import position from 'selection-position'
import { Editor } from 'slate-react'
import { placeholder } from '../const'

import { html as serializer } from '../hooks.js'
import { H1, H2, H3, H4, H5, H6 } from '../plugins/headings'
import ButtonGroup from '@splish-me/editor-ui/src/sidebar-elements/button'

const onBlur = (_event, _data, state) => state

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

class Slate extends Component {
  componentDidMount = () => {
    this.selection = window.getSelection()
    this.updateToolbar()
  }

  shouldComponentUpdate = nextProps =>
    nextProps.state.editorState !== this.props.state.editorState ||
    nextProps.state.toolbar !== this.props.state.toolbar ||
    nextProps.focused !== this.props.focused ||
    nextProps.readOnly !== this.props.readOnly

  componentDidUpdate = () => this.updateToolbar()

  onStateChange = ({ value }) => {
    this.props.onChange({ editorState: value })
  }

  handleOpen = portal => {
    // this.toolbar = portal.firstChild
  }

  updateToolbar = () => {
    const { editorState } = this.props.state
    const toolbar = this.toolbar

    if (
      !toolbar ||
      editorState.isBlurred ||
      editorState.selection.isCollapsed
    ) {
      return
    }
    const pos = position()
    if (pos) {
      const { left, top, width } = position()

      toolbar.style.opacity = 1
      toolbar.style.top = `${top + window.scrollY - toolbar.offsetHeight}px`
      toolbar.style.left = `${left +
        window.scrollX -
        toolbar.offsetWidth / 2 +
        width / 2}px`
    }
  }

  onPaste = (e, data, state) => {
    if (data.type !== 'html') return
    if (data.isShift) return

    const { document } = serializer.deserialize(data.html)

    return state.change().insertFragment(document)
  }

  render() {
    const {
      focused,
      readOnly,
      state: { editorState },
      plugins,
      onKeyDown,
      HoverButtons,
      ToolbarButtons,
      focus
    } = this.props

    return (
      <div>
        <Editor
          onChange={this.onStateChange}
          onKeyDown={onKeyDown}
          readOnly={Boolean(readOnly)}
          className="ory-plugins-content-slate-container"
          onBlur={onBlur}
          value={editorState}
          plugins={plugins}
          onPaste={this.onPaste}
          placeholder={placeholder}
        />
        {focused
          ? renderIntoSidebar(
              <React.Fragment>
                <ButtonGroup>
                  {plugins[2].createButton(H1, 'H1')({
                    editorState,
                    onChange: this.onStateChange,
                    focus
                  })}
                  {plugins[2].createButton(H2, 'H2')({
                    editorState,
                    onChange: this.onStateChange,
                    focus
                  })}
                  {plugins[2].createButton(H3, 'H3')({
                    editorState,
                    onChange: this.onStateChange,
                    focus
                  })}
                  {plugins[2].createButton(H4, 'H4')({
                    editorState,
                    onChange: this.onStateChange,
                    focus
                  })}
                  {plugins[2].createButton(H5, 'H5')({
                    editorState,
                    onChange: this.onStateChange,
                    focus
                  })}
                  {plugins[2].createButton(H6, 'H6')({
                    editorState,
                    onChange: this.onStateChange,
                    focus
                  })}
                </ButtonGroup>
                <HoverButtons
                  editorState={editorState}
                  onChange={this.onStateChange}
                  focus={focus}
                />
                <ToolbarButtons
                  editorState={editorState}
                  onChange={this.onStateChange}
                  focus={focus}
                />
              </React.Fragment>
            )
          : null}
      </div>
    )
  }
}

export default Slate
