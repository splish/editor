import {
  Document,
  createDocumentIdentifier
} from '@splish-me/editor-core-document'
import { DocumentIdentifier } from '@splish-me/editor-core-types'
import { renderIntoSidebar, Text } from '@splish-me/editor-ui-plugin-sidebar'
import * as React from 'react'

import { mockContentPlugin } from './mock-content.plugin'

interface MockWrapperProps {
  state: {
    state1: DocumentIdentifier
    state2: DocumentIdentifier
  }
  focused: boolean
}

export class MockWrapper extends React.Component<MockWrapperProps> {
  public render() {
    const { state, focused } = this.props
    const { state1, state2 } = state

    return (
      <React.Fragment>
        <hr />
        <Document defaultPlugin={mockContentPlugin} state={state1} />
        <hr />
        <Document defaultPlugin={mockContentPlugin} state={state2} />
        <hr />
        {focused ? renderIntoSidebar(<Text>MockWrapper</Text>) : null}
      </React.Fragment>
    )
  }
}

export const mockWrapperPlugin = {
  name: '@splish-me/mock-wrapper',
  version: '0.0.0',
  Component: MockWrapper,
  text: 'Mock Wrapper',
  createInitialState: (): MockWrapperProps['state'] => ({
    state1: createDocumentIdentifier(),
    state2: createDocumentIdentifier()
  })
}
