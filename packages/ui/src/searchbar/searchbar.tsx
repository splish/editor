import { EditorConsumer } from '@splish-me/editor-core/contexts'
// @ts-ignore
import { insertCellRightOf } from '@splish-me/ory-editor-core/actions/cell/insert'
// @ts-ignore
import { searchNodeEverywhere } from '@splish-me/ory-editor-core/selector/editable'
// @ts-ignore
import { focus } from '@splish-me/ory-editor-core/selector/focus'
import { css, cx } from 'emotion'
import * as React from 'react'
import * as R from 'ramda'
// @ts-ignore
import Autosuggest from 'react-autosuggest'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { ChangeEvent } from 'react'

type Node = unknown

interface Suggestion {
  name: string
  createNode: () => Node
}

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion: Suggestion) => suggestion.name

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion: Suggestion) => (
  <div>{suggestion.name}</div>
)

interface SearchbarProps {
  focusedCell: string
  insertCellRightOf: (node: Node, cellId: string) => void
  active: boolean
}

type InnerSearchbarProps = SearchbarProps & { editor: any }

interface InnerSearchbarState {
  value: string
  suggestions: Suggestion[]
}

class InnerSearchbar extends React.Component<
  InnerSearchbarProps,
  InnerSearchbarState
> {
  constructor(props: InnerSearchbarProps) {
    super(props)

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

  onChange = (_event: ChangeEvent, { newValue }: { newValue: string }) => {
    this.setState({
      value: newValue
    })
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }: { value: string }) => {
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

  generateSuggestions = (): Array<Suggestion> => {
    const plugins = this.props.editor.plugins.plugins.content.filter(
      (plugin: any) => plugin.name !== 'ory/editor/core/default'
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
  getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    return this.generateSuggestions().filter(item => {
      return item.name.toLowerCase().slice(0, inputLength) === inputValue
    })
  }

  onSuggestionSelected = (
    _event: React.ChangeEvent,
    { suggestion }: { suggestion: Suggestion }
  ) => {
    this.props.insertCellRightOf(
      suggestion.createNode(),
      this.props.focusedCell
    )
  }

  render() {
    const { active } = this.props
    const { value, suggestions } = this.state

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
    focusedCell: node ? R.prop('node', node) : undefined
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
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
  class Searchbar extends React.Component<InnerSearchbarProps> {
    render() {
      return (
        <EditorConsumer>
          {({ editor }) => {
            return <InnerSearchbar {...this.props} editor={editor} />
          }}
        </EditorConsumer>
      )
    }
  }
)
