// import { renderIntoSidebar } from '@splish-me/editor-ui/lib/plugin-sidebar.component'
import * as React from 'react'

export class MockBrokenContent extends React.Component {
  public render() {
    if (this.props.state.value === 'foo') {
      throw new Error("I don't like foo")
    }

    return (
      <React.Fragment>
        {/*{this.props.focused ? renderIntoSidebar('MockContent') : null}*/}
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
