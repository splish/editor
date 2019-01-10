import * as React from 'react'
import {
  Button,
  renderIntoToolbar,
  SidebarDropDown
} from '@splish-me/editor-ui-plugin-sidebar'

export interface MockContentProps {
  focused: boolean
  state: { value: string }
  onChange: (event: any) => void
}
export class MockContent extends React.Component<MockContentProps> {
  state = { value: 'h1' }
  public render() {
    return (
      <React.Fragment>
        {this.props.focused
          ? renderIntoToolbar(
              <React.Fragment>
                <SidebarDropDown
                  value={this.props.state.value}
                  options={[
                    { value: 'h1', label: 'H1' },
                    { value: 'h2', label: 'H2' },
                    { value: 'bold', label: 'Bold' }
                  ]}
                  onChange={selectedValue => {
                    this.props.onChange({ value: selectedValue })
                    console.log('selectedState:', selectedValue)
                  }}
                />
                <Button>h1</Button>

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
