// import { renderIntoSidebar } from '@splish-me/editor-ui/lib/plugin-sidebar.component'
import * as React from 'react'

export class MockContent extends React.Component {
  public render() {
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

export const mockContentPlugin = {
  name: '@splish-me/mock-content',
  version: '0.0.0',
  Component: MockContent,
  text: 'Mock Content',
  createInitialState: () => ({
    value: ''
  })
}
