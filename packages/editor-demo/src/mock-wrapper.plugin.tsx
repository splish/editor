import {
  Document,
  DocumentIdentifier,
  createDocumentIdentifier,
  Plugin,
  PluginEditorProps
} from '@splish-me/editor'
import {
  renderIntoSidebar,
  Text,
  Textarea,
  Dropdown,
  Button,
  ButtonGroup,
  Input,
  SettingOverlay
} from '@splish-me/editor-ui'
import * as React from 'react'

export class MockWrapper extends React.Component<
  PluginEditorProps<MockWrapperPluginState>
> {
  public render() {
    const { state, focused } = this.props
    const { state1, state2 } = state

    return (
      <React.Fragment>
        <SettingOverlay readOnly={this.props.preview}>
          <Input label="Test:" />{' '}
          <Dropdown label="select" value="a" options={['a', 'b', 'c']} />
          <Textarea label="test" />
          <ButtonGroup>
            <Button> Test</Button>
            <Button> Test2</Button>
          </ButtonGroup>
        </SettingOverlay>
        <hr />
        <Document defaultPlugin="mock-content" state={state1} />
        <hr />
        <Document defaultPlugin="mock-content" state={state2} />
        <hr />
        {focused ? renderIntoSidebar(<Text>MockWrapper</Text>) : null}
      </React.Fragment>
    )
  }
}

export const mockWrapperPlugin: Plugin<MockWrapperPluginState> = {
  text: 'Mock Wrapper',
  Component: MockWrapper,
  createInitialState: () => {
    return {
      state1: createDocumentIdentifier(),
      state2: createDocumentIdentifier()
    }
  }
}

interface MockWrapperPluginState {
  state1: DocumentIdentifier
  state2: DocumentIdentifier
}
