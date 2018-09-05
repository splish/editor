import { HtmlRenderer } from '@splish-me/editor-core/lib/html-renderer.component'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { mockBrokenContentPlugin } from '../src/mock-broken-content.plugin'
import { mockContentPlugin } from '../src/mock-content.plugin'
import { mockWrapperPlugin } from '../src/mock-wrapper.plugin'
import { EditableStory } from '../src'
import createSlatePlugin from '../../slate/src'

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
    <EditableStory defaultPlugin={textPlugin} plugins={[textPlugin]} />
  ))
  .add('Slate', () => (
    <EditableStory
      defaultPlugin={createSlatePlugin()}
      plugins={[createSlatePlugin()]}
    />
  ))
  .add('Renderer (2)', () => {
    const initialState = JSON.parse(
      '{"id":"12669454-7dc2-4e35-a8f5-bc384709c995","cells":[{"id":"df8115df-e422-4826-b441-0446b21e75fb","inline":null,"size":12,"rows":[{"id":"c74110ff-8949-4ee1-b39d-ee55e18183dc","cells":[{"id":"c825999c-4734-4228-8482-5883625c2944","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/mock-wrapper","version":"0.0.0"},"state":{"state1":{"type":"@splish-me/editor-core/editable","state":{"id":"7daf0511-ab01-49ae-83e6-c7b9fe8648ff","cells":[{"id":"588b7f5b-c191-46f5-85c9-ca40170835ca","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/mock-content","version":"0.0.0"},"state":{"value":""}}}]}},"state2":{"type":"@splish-me/editor-core/editable","state":{"id":"ad635172-ce35-4ede-b6d9-7f96ac69adfa","cells":[{"id":"0bb61571-8368-4f32-b43e-f7db20d0e5d4","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/mock-content","version":"0.0.0"},"state":{"value":""}}}]}}}}}]},{"id":"4074e942-4830-446a-9958-59b3a415d391","cells":[{"id":"f8174f1a-6556-4900-aed1-337f785e38e1","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/mock-wrapper","version":"0.0.0"},"state":{"state1":{"type":"@splish-me/editor-core/editable","state":{"id":"b442bb6c-910a-400d-b19a-6e5295e3f5ed","cells":[{"id":"ef60f83d-9426-4498-bdd8-9b3281f4e6a6","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/mock-content","version":"0.0.0"},"state":{"value":""}}}]}},"state2":{"type":"@splish-me/editor-core/editable","state":{"id":"72cf8a10-9e61-42a7-9f4f-96aef3694fbd","cells":[{"id":"1ab29b66-442d-4482-a3ba-04ddd25ef8f1","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/mock-content","version":"0.0.0"},"state":{"value":""}}}]}}}}}]},{"id":"820d308e-dd70-437c-89b3-17088d7de9e9","cells":[{"id":"38ff1214-6504-40a0-9ab6-5616c05b05b7","inline":null,"size":6,"content":{"plugin":{"name":"@splish-me/mock-wrapper","version":"0.0.0"},"state":{"state1":{"type":"@splish-me/editor-core/editable","state":{"id":"71df84a3-5e2d-44bd-93d9-4dc41a22ec7b","cells":[{"id":"b58c08fe-484f-40a3-abbf-46ffddf4df43","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/mock-content","version":"0.0.0"},"state":{"value":""}}}]}},"state2":{"type":"@splish-me/editor-core/editable","state":{"id":"8d5fe377-864a-41d0-b234-4e72d900f911","cells":[{"id":"580aae15-a819-433d-bf87-0fb574ae855d","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/mock-content","version":"0.0.0"},"state":{"value":""}}}]}}}}},{"id":"0c94f4d3-50bb-4758-908d-60ab25655777","inline":null,"size":6,"content":{"plugin":{"name":"@splish-me/mock-wrapper","version":"0.0.0"},"state":{"state1":{"type":"@splish-me/editor-core/editable","state":{"id":"1785f596-9d9a-42ac-914a-85cc8bf4c4d0","cells":[{"id":"7b8f106b-0e5c-4800-a295-3803a694e25d","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/mock-content","version":"0.0.0"},"state":{"value":""}}}]}},"state2":{"type":"@splish-me/editor-core/editable","state":{"id":"5dfbb467-4b48-41af-a902-385bc405733a","cells":[{"id":"fdf02382-bb8c-4755-8a1b-6036238d52d7","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/mock-content","version":"0.0.0"},"state":{"value":""}}}]}}}}}]}]}]}'
    )

    return (
      <HtmlRenderer
        plugins={[mockContentPlugin, mockWrapperPlugin]}
        state={initialState}
      />
    )
  })
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
