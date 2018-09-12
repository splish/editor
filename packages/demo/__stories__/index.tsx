import { HtmlRenderer } from '@splish-me/editor-core/src/html-renderer.component'
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
} from '@splish-me/editor-ui/src/sidebar-elements/button'
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
  createToggleUnorderedList,
  createToggleOrderedList,
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
      '{"id":"1e6f63c0-9a5c-4ca8-afb4-461308a6b755","cells":[{"id":"ee2b8230-07b9-43d1-9f45-ef604e3e6fdc","inline":null,"size":12,"content":{"plugin":{"name":"@splish-me/slate","version":"0.0.5"},"state":{"editorState":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"@splish-me/h1","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Title","marks":[]}]}]},{"object":"block","type":"@splish-me/ul","data":{},"nodes":[{"object":"block","type":"@splish-me/li","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"A list","marks":[]}]}]},{"object":"block","type":"@splish-me/li","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"is nice","marks":[]}]}]},{"object":"block","type":"@splish-me/li","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"with some ","marks":[]},{"object":"leaf","text":"formatting ","marks":[{"object":"mark","type":"@splish-me/strong","data":{}}]},{"object":"leaf","text":"and ","marks":[]},{"object":"leaf","text":"underlining","marks":[{"object":"mark","type":"@splish-me/u","data":{}}]},{"object":"leaf","text":" and ","marks":[]},{"object":"leaf","text":"code","marks":[{"object":"mark","type":"@splish-me/code","data":{}}]}]}]},{"object":"block","type":"@splish-me/li","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Also some inline ","marks":[]}]},{"object":"inline","type":"@splish-me/katex-inline","data":{"formula":"\\\\sum x_i = 5","inline":true},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]},{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]}]},{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"or block ","marks":[]}]},{"object":"inline","type":"@splish-me/a","data":{"href":"google.de"},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"formula","marks":[]}]}]},{"object":"text","leaves":[{"object":"leaf","text":":","marks":[]}]}]},{"object":"block","type":"@splish-me/p","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]},{"object":"inline","type":"@splish-me/katex-inline","data":{"formula":"qw3eqweew","inline":true},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]},{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]}]}}}}}]}'
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
                  applyChange(createToggleUnorderedList(defaultNode))
                }}
              >
                ul
              </Button>
              <Button
                active={isOrderedList(value.change())}
                onClick={() => {
                  applyChange(createToggleOrderedList(defaultNode))
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

    const slatePlugin = createSlatePlugin({ defaultNode, plugins })
    const slateRenderPlugin = createSlateRenderPlugin({ plugins })

    return (
      <React.Fragment>
        <EditableStory
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
