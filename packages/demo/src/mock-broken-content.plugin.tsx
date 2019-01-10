import { renderIntoSidebar, Text } from '@splish-me/editor-ui-plugin-sidebar'
import * as React from 'react'

export interface MockBrokenContentProps {
  state: { value: string }
  onChange?: (event: any) => void
  focused: boolean
}
export class MockBrokenContent extends React.Component<MockBrokenContentProps> {
  public render() {
    if (this.props.state.value === 'foo') {
      throw new Error("I don't like foo")
    }

    return (
      <React.Fragment>
        {this.props.focused
          ? renderIntoSidebar(<Text>MockContent</Text>)
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

export const mockBrokenContentPlugin = {
  name: '@splish-me/mock-broken-content',
  version: '0.0.0',
  Component: MockBrokenContent,
  text: 'Mock Content',
  createInitialState: () => ({
    value: ''
  })
}
