import { HtmlRenderer } from '@splish-me/editor-core/html-renderer.component'
import { createSlatePlugin } from '@splish-me/editor-plugin-slate/src'
import { defaultPlugins } from '@splish-me/editor-plugin-slate/src/default-plugins'
import { defaultNode } from '@splish-me/editor-plugin-slate/src/default-node'
import { createSlateRenderPlugin } from '@splish-me/editor-plugin-slate/src/index.render'
import { createUiPlugin } from '@splish-me/editor-plugin-slate/src/plugins/ui'
import {
  createKatexPlugin,
  isKatex,
  insertKatex
} from '@splish-me/editor-plugin-slate/src/plugins/katex'
import { setParagraph } from '@splish-me/editor-plugin-slate/src/plugins/paragraph'
import ButtonGroup, {
  Button
} from '@splish-me/editor-ui/sidebar-elements/button'
import { storiesOf } from '@storybook/react'
import * as R from 'ramda'
import * as React from 'react'

import { mockBrokenContentPlugin } from '../src/mock-broken-content.plugin'
import { mockContentPlugin } from '../src/mock-content.plugin'
import { mockWrapperPlugin } from '../src/mock-wrapper.plugin'
import { EditableStory } from '../src'
import {
  HeadingLevel,
  createIsHeading,
  createSetHeading
} from '@splish-me/editor-plugin-slate/src/plugins/headings'
import { RenderAttributes } from 'slate-react'
import { Change, Value } from 'slate'
import {
  isStrong,
  toggleStrong,
  isEmphasized,
  toggleEmphasize,
  isUnderlined,
  toggleUnderline
} from '@splish-me/editor-plugin-slate/src/plugins/rich-text'
import {
  isLink,
  unwrapLink,
  wrapLink
} from '@splish-me/editor-plugin-slate/src/plugins/link'

import 'katex/dist/katex.css'
import {
  isCode,
  toggleCode
} from '@splish-me/editor-plugin-slate/src/plugins/code'
import {
  isUnorderedList,
  toggleUnorderedList,
  toggleOrderedList,
  isOrderedList
} from '@splish-me/editor-plugin-slate/src/plugins/lists'

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
  .add('Slate', () => {
    const state = JSON.parse(
      '{"id":"51d2c74a-419e-447b-9210-248838ef7db8","cells":[{"id":"5bcc85bc-77fa-4c1c-98e3-f920699e6d14","inline":null,"size":12,"rows":[{"id":"4fda5f46-6770-4000-979f-f0406c19d56b","cells":[{"id":"383c8974-8806-478c-8700-e25e4d011612","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.","marks":[]}]}]}]}}}}}]},{"id":"89e156a7-7b20-4a9f-89e8-21da01c0e92a","cells":[{"id":"b10a76ba-d50f-462b-9333-f427cf7c241b","inline":null,"size":6,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.","marks":[]}]}]}]}}}}},{"id":"92fa829c-02e1-49e7-a595-ae1b36fb3cf5","inline":null,"size":6,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.","marks":[]}]}]}]}}}}}]},{"id":"3dd3e07b-d60b-4943-aa2c-92b2ef1c5392","cells":[{"id":"d097e7f0-7cd1-447d-a70e-936f5731f203","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.","marks":[]}]}]}]}}}}}]},{"id":"0db7b180-cb6e-4946-9d21-6b1c1bf111a4","cells":[{"id":"9df37ed5-f505-43f5-9ad6-cd24e6c3b25d","inline":null,"size":6,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Col1","marks":[]}]}]}]}}}}},{"id":"191f8481-5cb2-4459-ae83-9ba2c816ad06","inline":null,"size":6,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.11"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Col2","marks":[]}]}]}]}}}}}]}]}]}'
    )
    class Component extends React.Component<RenderAttributes> {
      public render() {
        // FIXME: move to parent
        const onChange = this.props.onChange as (change: Change) => void
        const value = this.props.value as Value

        const applyChange = (f: (change: Change) => Change): void => {
          const change = value.change()
          onChange(f(change))
        }

        return (
          <React.Fragment>
            <ButtonGroup>
              <Button
                active={isStrong(value.change())}
                onClick={() => {
                  applyChange(toggleStrong)
                }}
              >
                B
              </Button>
              <Button
                active={isEmphasized(value.change())}
                onClick={() => {
                  applyChange(toggleEmphasize)
                }}
              >
                I
              </Button>
              <Button
                active={isUnderlined(value.change())}
                onClick={() => {
                  applyChange(toggleUnderline)
                }}
              >
                U
              </Button>
              <Button
                active={isCode(value.change())}
                onClick={() => {
                  applyChange(toggleCode)
                }}
              >
                Code
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              {R.times(index => {
                const level = (index + 1) as HeadingLevel
                const active = createIsHeading(level)(value.change())

                return (
                  <Button
                    key={index}
                    active={active}
                    onClick={() => {
                      applyChange(
                        active ? setParagraph : createSetHeading(level)
                      )
                    }}
                  >
                    H{level}
                  </Button>
                )
              }, 6)}
            </ButtonGroup>
            <ButtonGroup>
              <Button
                active={isLink(value.change())}
                onClick={() => {
                  const active = isLink(value.change())

                  applyChange(active ? unwrapLink : wrapLink())
                }}
              >
                Link
              </Button>
              <Button
                active={isKatex(value.change())}
                onClick={() => {
                  const active = isKatex(value.change())

                  if (!active) {
                    applyChange(insertKatex)
                  }
                }}
              >
                Katex
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button
                active={isUnorderedList(value.change())}
                onClick={() => {
                  applyChange(toggleUnorderedList)
                }}
              >
                ul
              </Button>
              <Button
                active={isOrderedList(value.change())}
                onClick={() => {
                  applyChange(toggleOrderedList)
                }}
              >
                ol
              </Button>
            </ButtonGroup>
          </React.Fragment>
        )
      }
    }

    const plugins = [
      ...defaultPlugins,
      createKatexPlugin(),
      createUiPlugin({
        defaultNode,
        Component
      })
    ]

    const slatePlugin = createSlatePlugin({ plugins })
    const slateRenderPlugin = createSlateRenderPlugin({ plugins })

    return (
      <React.Fragment>
        <EditableStory
          mode="layout"
          initialState={state}
          defaultPlugin={slatePlugin}
          plugins={[slatePlugin]}
        />
        <HtmlRenderer state={state} plugins={[slateRenderPlugin]} />
      </React.Fragment>
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
                  type: '@splish-me/editor-core/editable',
                  state: {
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
                  }
                },
                state2: {
                  type: '@splish-me/editor-core/editable',
                  state: {
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
                  type: '@splish-me/editor-core/editable',
                  state: {
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
                  }
                },
                state2: {
                  type: '@splish-me/editor-core/editable',
                  state: {
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
          }
        ]
      }}
    />
  ))
