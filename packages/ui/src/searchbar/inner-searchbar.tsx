import { css, cx } from 'emotion'
import Autosuggest from 'react-autosuggest'
import * as React from 'react'

interface InnerSearchbarProps {
  suggestions: any[]
  active: boolean
  placeholder: string
  value: string
  onChange: (event: any, input: { newValue: string }) => void
}

export class InnerSearchbar extends React.Component<InnerSearchbarProps> {
  constructor(p) {
    super(p)

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: this.props.value,
      suggestions: this.props.suggestions
    }
  }

  render() {
    const { active, value } = this.props
    const { suggestions } = this.state

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: this.props.placeholder,
      value: value,
      onChange: this.props.onChange
    }
    console.log('inner searchbar')
    if (!active) {
      {
        console.log('null')
      }
      return null
    }
    return (
      <div
        className={cx(
          css({
            backgroundColor: '#333333',
            position: 'fixed',
            right: '50%',
            top: 0,
            zIndex: '10000'
          }),
          'ory-prevent-blur'
        )}
      >
        {console.log('Autosuggest')}
        <Autosuggest
          suggestions={this.props.suggestions}
          onSuggestionsFetchRequested={this.props.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.props.onSuggestionsClearRequested}
          onSuggestionSelected={this.props.onSuggestionSelected}
          getSuggestionValue={this.props.getSuggestionValue}
          renderSuggestion={this.props.renderSuggestion}
          inputProps={inputProps}
          alwaysRenderSuggestions
        />
      </div>
    )
  }
}
