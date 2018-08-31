import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { mockContentPlugin } from '../src/mock-content.plugin'
import { mockWrapperPlugin } from '../src/mock-wrapper.plugin'
import { EditableStory } from '../src'
import { HtmlRenderer } from '@splish-me/editor-core/src/html-renderer.component'

storiesOf('Demo', module)
  .add('Editable', () => (
    <EditableStory
      defaultPlugin={mockWrapperPlugin}
      plugins={[mockContentPlugin, mockWrapperPlugin]}
    />
  ))
  .add('Renderer', () => (
    <HtmlRenderer
      plugins={[mockContentPlugin, mockWrapperPlugin]}
      state={{
        id: '5018f17e-97be-4a8b-bf81-8b8b789645f4',
        cells: [
          {
            id: '86550181-644a-479c-96a2-583081a72b89',
            inline: null,
            size: 2,
            content: {
              plugin: { name: '@splish-me/mock-wrapper', version: '0.0.0' },
              state: {
                state1: {
                  id: '6d4b9324-5988-47d6-b3ac-931075a916dd',
                  cells: [
                    {
                      id: '16fd5d95-9157-42f2-8c15-ce60ba3d099c',
                      inline: null,
                      size: 12,
                      content: {
                        plugin: {
                          name: '@splish-me/mock-content',
                          version: '0.0.0'
                        },
                        state: { value: '' }
                      }
                    }
                  ]
                },
                state2: {
                  id: 'a15053b0-0384-412d-857a-f082cbf359d3',
                  cells: [
                    {
                      id: '7ed98861-0b85-4cb3-b389-1b3e508ddbf9',
                      inline: null,
                      size: 12,
                      content: {
                        plugin: {
                          name: '@splish-me/mock-content',
                          version: '0.0.0'
                        },
                        state: { value: '' }
                      }
                    }
                  ]
                }
              }
            }
          },
          {
            id: '1962d602-1ddd-4193-9869-6416a05b54e4',
            inline: null,
            size: 10,
            content: {
              plugin: { name: '@splish-me/mock-wrapper', version: '0.0.0' },
              state: {
                state1: {
                  id: '5c746d92-5b60-4692-a389-02887dc143bd',
                  cells: [
                    {
                      id: '91e53d09-d230-4e90-beae-6b9c948e248f',
                      inline: null,
                      size: 12,
                      content: {
                        plugin: {
                          name: '@splish-me/mock-content',
                          version: '0.0.0'
                        },
                        state: { value: '' }
                      }
                    }
                  ]
                },
                state2: {
                  id: 'af16b23a-585b-4321-9c54-119aeb56894b',
                  cells: [
                    {
                      id: '56ccd64b-7616-4f3f-baff-a58d85f2fe48',
                      inline: null,
                      size: 12,
                      content: {
                        plugin: {
                          name: '@splish-me/mock-content',
                          version: '0.0.0'
                        },
                        state: { value: '' }
                      }
                    }
                  ]
                }
              }
            }
          }
        ]
      }}
    />
  ))
