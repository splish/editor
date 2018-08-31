import { EditorConsumer } from '@splish-me/editor-core/src/contexts'
import { insertCellRightOf } from '@splish-me/ory-editor-core/src/actions/cell/insert'
import { searchNodeEverywhere } from '@splish-me/ory-editor-core/src/selector/editable'
import { focus } from '@splish-me/ory-editor-core/src/selector/focus'
import { css, cx } from 'emotion'
import * as React from 'react'
import * as R from 'ramda'
import Autosuggest from 'react-autosuggest'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <div>{suggestion.name}</div>

interface InnerSearchbarProps {
  editor: any
  focusedCell: any
  insertCellRightOf: () => void
  active: boolean
}
class InnerSearchbar extends React.Component<InnerSearchbarProps> {
  constructor(p) {
    super(p)

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',

      suggestions: this.getSuggestions('')
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: this.getSuggestions('')
    })
  }

  generateSuggestions = (): Array<{ name: string; createNode: () => any }> => {
    const plugins = this.props.editor.plugins.plugins.content.filter(
      plugin => plugin.name !== 'ory/editor/core/default'
    )

    const newSuggestions = R.map(plugin => {
      return {
        name: plugin.text,
        createNode() {
          return {
            content: {
              plugin,
              state: plugin.createInitialState()
            }
          }
        }
      }
    }, plugins)
    return newSuggestions
  }
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    return this.generateSuggestions().filter(item => {
      return item.name.toLowerCase().slice(0, inputLength) === inputValue
    })
  }

  onSuggestionSelected = (event, { suggestion }) => {
    this.props.insertCellRightOf(
      suggestion.createNode(),
      this.props.focusedCell
    )
  }

  render() {
    const { editor, active } = this.props
    const { value, suggestions } = this.state
    console.log(this.props.focusedCell)
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value: value,
      onChange: this.onChange
    }
    if (!active) return null
    // Finally, render it!
    return (
      <div
        className={cx(
          css({
            marginLeft: '30%',
            zIndex: 1000,
            position: 'absolute',
            backgroundColor: '#333333'
          }),
          'ory-prevent-blur'
        )}
      >
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          alwaysRenderSuggestions
        />
      </div>
    )
  }
}
const mapStateToProps = (state: any) => {
  const id = focus(state)
  const node = searchNodeEverywhere(state, id)

  return {
    focusedCell: R.prop('node', node)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      insertCellRightOf
    },
    dispatch
  )

export const Searchbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class Searchbar extends React.Component {
    render() {
      return (
        <EditorConsumer>
          {({ editor }) => {
            const plugins = editor.plugins.plugins.content
            console.log(plugins)
            return <InnerSearchbar {...this.props} editor={editor} />
          }}
        </EditorConsumer>
      )
    }
  }
)
