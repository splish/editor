import { Plugin, PluginEditorProps } from '@splish-me/editor'
import { renderIntoSidebar, Text } from '@splish-me/editor-ui-plugin-sidebar'
import * as React from 'react'

export class MockContent extends React.Component<
  PluginEditorProps<MockContentPluginState>
> {
  public render() {
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

export const mockContentPlugin: Plugin<MockContentPluginState> = {
  text: 'Mock Content',
  Component: MockContent,
  createInitialState: () => {
    return { value: '' }
  }
}

interface MockContentPluginState {
  value: string
}
