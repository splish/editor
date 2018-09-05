import React, { Component } from 'react'
import debounce from 'lodash.debounce'
import * as Portal from 'react-portal'
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
