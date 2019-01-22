import { PluginEditorProps } from '@splish-me/editor'
import { renderIntoSidebar, Text } from '@splish-me/editor-ui-plugin-sidebar'
import * as React from 'react'

export class MockBrokenContent extends React.Component<
  PluginEditorProps<{ value: string }>
> {
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
  Component: MockBrokenContent,
  text: 'Mock Content',
  createInitialState: () => ({
    value: ''
  })
}
