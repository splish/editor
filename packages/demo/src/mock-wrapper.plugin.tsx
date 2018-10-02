import { faInfinity } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Editable,
  EditableIdentifier,
  createEditableIdentifier
} from '@splish-me/editor-core/editable.component'
import { renderIntoSidebar } from '@splish-me/editor-ui/plugin-sidebar.component'
import * as React from 'react'

import { mockContentPlugin } from './mock-content.plugin'

interface MockWrapperProps {
  state: {
    state1: EditableIdentifier
    state2: EditableIdentifier
  }
}

export class MockWrapper extends React.Component<MockWrapperProps> {
  public render() {
    const { state, focused } = this.props
    const { state1, state2 } = state

    return (
      <React.Fragment>
        <hr />
        <Editable defaultPlugin={mockContentPlugin} id={state1} />
        <hr />
        <Editable defaultPlugin={mockContentPlugin} id={state2} />
        <hr />
        {focused ? renderIntoSidebar('MockWrapper') : null}
      </React.Fragment>
    )
  }
}

export const mockWrapperPlugin = {
  name: '@splish-me/mock-wrapper',
  version: '0.0.0',
  IconComponent: <FontAwesomeIcon icon={faInfinity} />,
  Component: MockWrapper,
  text: 'Mock Wrapper',
  createInitialState: (): MockWrapperProps['state'] => ({
    state1: createEditableIdentifier(),
    state2: createEditableIdentifier()
  })
}
