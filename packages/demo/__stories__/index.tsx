import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { mockBrokenContentPlugin } from '../src/mock-broken-content.plugin'
import { mockContentPlugin } from '../src/mock-content.plugin'
import { mockWrapperPlugin } from '../src/mock-wrapper.plugin'
import { EditableStory } from '../src'
import { HtmlRenderer } from '@splish-me/editor-core/src/html-renderer.component'
import { textPlugin } from '@splish-me/editor-plugin-text/src'

storiesOf('Demo', module)
  .add('Editable', () => (
    <EditableStory
      defaultPlugin={mockWrapperPlugin}
      plugins={[mockContentPlugin, mockWrapperPlugin]}
    />
  ))
  .add('Editable (preloaded state)', () => (
    <EditableStory
      initialState={JSON.parse(
        '{"id":"41ed8918-0a33-496f-b281-0cef7c0b13f3","cells":[{"id":"4f93f426-403e-4df4-baaf-7b324ce4d6a2","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/mock-wrapper","version":"0.0.0"},"state":{"state1":{"type":"@splish-me/editor-core/editable","state":{"id":"42a8937c-90be-4993-a214-7c0185d47bc0","cells":[{"id":"e6c80279-6a1f-442a-a721-1e7a40b839a0","inline":null,"size":6,"content":{"plugin":{"name":"@splish-me/mock-wrapper","version":"0.0.0"},"state":{"state1":{"type":"@splish-me/editor-core/editable","state":{"id":"fa137ea1-04be-40e7-ab26-b1e63cdc0cb8","cells":[{"id":"347b677e-e4c7-4b4e-9b33-27ba952f88fc","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/mock-content","version":"0.0.0"},"state":{"value":"foooooooo"}}}]}},"state2":{"type":"@splish-me/editor-core/editable","state":{"id":"8e6b442a-aae7-4682-ba4c-13635d477bf7","cells":[{"id":"4ca68ff8-1847-40e5-b2af-ee61f5db9ee9","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/mock-content","version":"0.0.0"},"state":{"value":"foooooooo2"}}}]}}}}},{"id":"3c44d1d3-9228-4cd5-a653-3f482a7b2dd1","inline":null,"size":6,"content":{"plugin":{"name":"@splish-me/mock-content","version":"0.0.0"},"state":{"value":"foooooooo4"}}}]}},"state2":{"type":"@splish-me/editor-core/editable","state":{"id":"e0ed545c-b220-45ef-9e5c-b1f2dab894d2","cells":[{"id":"78cbe982-3685-4d78-a8ee-f2ef4ca24744","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/mock-content","version":"0.0.0"},"state":{"value":"fooooooo3"}}}]}}}}}]}'
      )}
      defaultPlugin={mockWrapperPlugin}
      plugins={[mockContentPlugin, mockWrapperPlugin]}
    />
  ))
  .add('Editable (Error boundary)', () => (
    <EditableStory
      defaultPlugin={mockBrokenContentPlugin}
      plugins={[mockBrokenContentPlugin]}
    />
  ))
  .add('Text', () => (
    <EditableStory
      initialState={JSON.parse(
        '{"id":"dd6598b7-00b4-4485-95d4-88e643b8f611","cells":[{"id":"e29a79d1-3774-4a28-92b8-f9b97ba21bcd","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/text","version":"0.0.0"},"state":{"value":[{"insert":"eqeqweqweqweqwewqe\\n"}]}}}]}'
      )}
      defaultPlugin={textPlugin}
      plugins={[textPlugin]}
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
