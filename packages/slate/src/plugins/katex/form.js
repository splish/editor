/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0-or-later
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 * @copyright 2018 Splish UG (haftungsbeschränkt)
 * @author Splish UG (haftungsbeschränkt)
 */
import React, { Component } from 'react'
import debounce from 'lodash.debounce'
import { renderIntoSidebar } from '@splish-me/editor-ui/lib/plugin-sidebar.component'
import Textarea from '@splish-me/editor-ui/lib/sidebar-elements/textarea'
import Checkbox from '@splish-me/editor-ui/lib/sidebar-elements/checkbox'

class Form extends Component {
  textarea = React.createRef()

  constructor(props) {
    super(props)

    // TODO: derivedStateFromProps instead
    const { formula, inline } = this.props
    this.state = {
      formula,
      inline
    }
    this.renderMath = debounce(this.renderMath, 500)
  }
  componentWillReceiveProps(nextProps) {
    const { formula, inline } = nextProps
    this.setState({
      formula,
      inline
    })
  }
  handleFormulaChange = e => {
    const newFormula = e.target.value

    this.setState({
      formula: newFormula
    })
    this.renderMath(newFormula)
  }

  handleInlineChange = e => {
    const inline = e.target.checked

    this.setState({
      inline: inline
    })
    const { editor, node } = this.props
    const { key } = node

    editor.change(change => {
      change.setNodeByKey(key, {
        data: {
          formula: this.state.formula,
          inline: inline
        }
      })
    })
  }

  renderMath = newFormula => {
    const { editor, node } = this.props
    const { key } = node

    editor.change(change => {
      change.setNodeByKey(key, {
        data: {
          formula: newFormula,
          inline: this.state.inline
        }
      })
    })

    setTimeout(() => {
      // FIXME:
      this.textarea.current.focus()
    }, 0)
  }

  render() {
    const { node, isFocused, isSelected } = this.props
    const isActive = isFocused && isSelected

    if (!isActive) {
      return null
    }

    return renderIntoSidebar(
      <React.Fragment>
        <Textarea
          innerRef={this.textarea}
          label="Formula"
          value={this.state.formula}
          onChange={this.handleFormulaChange}
          placeholder="\\frac{1}{2}"
        />
        <Checkbox
          value={this.state.inline}
          label="Inline"
          onChange={this.handleInlineChange}
        />
      </React.Fragment>
      // <MuiThemeProvider muiTheme={getMuiTheme()}>
      //   <div
      //     className="ory-prevent-blur ory-plugins-content-slate-inline-toolbar"
      //     style={{
      //       display: 'inline-block',
      //       border: `${darkBlack} 1px solid`,
      //       borderRadius: '4px 4px 0',
      //       backgroundColor: darkBlack,
      //       padding: '0 12px'
      //     }}
      //   >
      //     <TextField
      //       ref={this.focusReference}
      //       hintText={'\\frac{1}{2}'}
      //       floatingLabelText="Formula"
      //       inputStyle={{ color: 'white' }}
      //       floatingLabelStyle={{ color: 'white' }}
      //       hintStyle={{ color: 'grey' }}
      //       style={{ width: '800px' }}
      //       value={this.state.formula}
      //       onChange={this.handleChange}
      //     />
      //   </div>
      // </MuiThemeProvider>
    )
  }
}
export default Form
