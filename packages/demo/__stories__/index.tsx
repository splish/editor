import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { mockBrokenContentPlugin } from '../src/mock-broken-content.plugin'
import { mockContentPlugin } from '../src/mock-content.plugin'
import { mockWrapperPlugin } from '../src/mock-wrapper.plugin'
import { DocumentStory } from '../src'

storiesOf('Demo', module).add('Editor', () => {
  return (
    <DocumentStory
      defaultPlugin={mockWrapperPlugin}
      plugins={[mockContentPlugin, mockWrapperPlugin]}
    />
  )
})
