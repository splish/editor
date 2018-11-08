import * as React from 'react'
import { connect } from 'react-redux'
import { InnerSearchbar } from '@splish-me/editor-ui/searchbar/inner-searchbar'
import { insertCellRightOf } from '@splish-me/ory-editor-core/actions/cell/insert'
import { searchNodeEverywhere } from '@splish-me/ory-editor-core/selector/editable'
import { focus } from '@splish-me/ory-editor-core/selector/focus'
import { bindActionCreators } from 'redux'
import * as R from 'ramda'

interface SearchbarProps {
  editor: any
  active: boolean
  suggestions: string[]
  focusedCell: any
  insertCellRightOf: any
}
const mapStateToProps = (state: any) => {
  const id = focus(state)
  const node = searchNodeEverywhere(state, id)

  return {
    focusedCell: node ? R.prop('node', node) : undefined
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      insertCellRightOf
    },
    dispatch
  )

const getPluginSuggestionValue = suggestion => suggestion.name
const renderPluginSuggestion = suggestion => <div>{suggestion.name}</div>
const renderStringSuggestion = suggestion => <div>{suggestion}</div>
export const Searchbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class Searchbar extends React.Component<SearchbarProps> {
    state = { secondStep: false, placeholder: 'searchbar', value: '' }
    render() {
      return this.state.secondStep ? (
        <InnerSearchbar
          suggestions={this.getPluginSuggestions('')}
          onSuggestionsFetchRequested={this.onPluginSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onPluginSuggestionsClearRequested}
          onSuggestionSelected={this.onPluginSuggestionSelected}
          getSuggestionValue={getPluginSuggestionValue}
          renderSuggestion={renderPluginSuggestion}
          value={this.state.value}
          onChange={this.onChange}
          active
        >
          {console.log('second step')}
        </InnerSearchbar>
      ) : (
        <InnerSearchbar
          suggestions={this.getStringSuggestions('')}
          onSuggestionsFetchRequested={this.onStringSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onStringSuggestionsClearRequested}
          onSuggestionSelected={this.onStringSuggestionSelected}
          getSuggestionValue={suggestion => suggestion}
          renderSuggestion={renderStringSuggestion}
          value={this.state.value}
          onChange={this.onChange}
          active
        >
          {console.log('first step')}
        </InnerSearchbar>
      )
    }
    getPluginSuggestions = (value: string) => {
      const inputValue = value.trim().toLowerCase()
      const inputLength = inputValue.length
      return this.generatePluginSuggestions().filter(item => {
        return item.name.toLowerCase().slice(0, inputLength) === inputValue
      })
    }
    generatePluginSuggestions = (): Array<{
      name: string
      createNode: () => any
    }> => {
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
    getStringSuggestions = (value: string) => {
      const inputValue = value.trim().toLowerCase()
      const inputLength = inputValue.length
      return this.props.suggestions.filter((item: string) => {
        return item.toLowerCase().slice(0, inputLength) === inputValue
      })
    }
    onStringSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: this.getStringSuggestions(value)
      })
    }
    onPluginSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: this.getPluginSuggestions(value)
      })
    }
    onStringSuggestionsClearRequested = () => {
      this.setState({
        suggestions: this.getStringSuggestions('')
      })
    }
    onPluginSuggestionsClearRequested = () => {
      this.setState({
        suggestions: this.getPluginSuggestions('')
      })
    }
    onStringSuggestionSelected = (event, { suggestion }) => {
      this.setState({
        secondStep: true,
        value: ''
      })
    }
    onPluginSuggestionSelected = (event, { suggestion }) => {
      console.log(this.props.focusedCell)
      this.props.insertCellRightOf(
        suggestion.createNode(),
        this.props.focusedCell
      )
      this.setState({
        secondStep: false,
        value: ''
      })
    }
    onChange = (_event, { newValue }) => {
      this.setState({
        value: newValue
      })
    }
  }
)
