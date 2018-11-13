import { renderIntoSidebar, Text } from '@splish-me/editor-ui-plugin-sidebar'
import * as React from 'react'
import { Button } from '@splish-me/editor-ui/sidebar-elements/button'
import SidebarDropDown from '@splish-me/editor-ui/sidebar-elements/dropdown'

export class MockContent extends React.Component {
  state = { value: null }
  public render() {
    return (
      <React.Fragment>
        {this.props.focused
          ? renderIntoSidebar(
              <React.Fragment>
                <Button>h1</Button>
                <SidebarDropDown
                  label="placeholder"
                  value={this.state.value}
                  options={[
                    { value: 'chocolate', label: 'Chocolate' },
                    { value: 'strawberry', label: 'Strawberry' },
                    { value: 'vanilla', label: 'Vanilla' }
                  ]}
                  onChange={selectedValue => {
                    this.setState({ selectedValue })
                    console.log('selectedState:', selectedValue)
                  }}
                />
                <Button active>h1</Button>
              </React.Fragment>
            )
          : null}
        <textarea
          value={this.props.state.value}
          onChange={e => {
            this.props.onChange({ value: e.target.value })
          }}
        />
      </React.Fragment>
    )
  }
}

export const mockContentPlugin = {
  name: '@splish-me/mock-content',
  version: '0.0.0',
  Component: MockContent,
  text: 'Mock Content',
  createInitialState: () => ({
    value: ''
  })
}
