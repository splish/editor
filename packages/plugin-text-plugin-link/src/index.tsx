import {
  NodeEditorProps,
  NodeRendererProps,
  TextPlugin
} from '@splish-me/editor-plugin-text-plugin'
import { renderIntoSidebar, Input } from '@splish-me/editor-ui-plugin-sidebar'
import { debounce } from 'lodash'
import { Change, Inline, Data, InlineJSON } from 'slate'
import * as React from 'react'
import { RefObject } from 'react'

export const linkNode = '@splish-me/a'

export interface LinkPluginOptions {
  EditorComponent?: React.ComponentType<NodeEditorProps>
  RenderComponent?: React.ComponentType<NodeRendererProps>
}

interface DefaultEditorComponentState {
  lastValue: string
  value: string
}

class DefaultEditorComponent extends React.Component<
  NodeEditorProps,
  DefaultEditorComponentState
> {
  public state: DefaultEditorComponentState = {
    // @ts-ignore FIXME
    lastValue: (this.props.node as Inline).data.get('href'),
    // @ts-ignore FIXME
    value: (this.props.node as Inline).data.get('href')
  }

  static getDerivedStateFromProps(
    props: NodeEditorProps,
    state: DefaultEditorComponentState
  ): DefaultEditorComponentState | null {
    // @ts-ignore FIXME
    const newValue = (props.node as Inline).data.get('href')

    if (newValue === state.lastValue) {
      return null
    }

    return {
      lastValue: newValue,
      value: newValue
    }
  }

  private handleChange = debounce((href: string) => {
    const { editor, node } = this.props
    // @ts-ignore FIXME
    const inline = node as Inline

    // @ts-ignore FIXME
    editor.change(change => {
      change
        .setNodeByKey(inline.key, {
          type: inline.type,
          data: {
            href
          }
        })
        .focus()
    })

    setTimeout(() => {
      const input = this.input.current
      if (input) {
        // FIXME: @ts-ignore
        input.focus()
      }
    })
  }, 500)

  private input = React.createRef<Input>() as RefObject<Input> & string

  public render() {
    const { attributes, children, node, isSelected } = this.props
    // @ts-ignore FIXME
    const inline = node as Inline
    const { value } = this.state

    const href = inline.data.get('href')

    return (
      <React.Fragment>
        <a {...attributes} href={href}>
          {children}
        </a>
        {isSelected
          ? renderIntoSidebar(
              <React.Fragment>
                <Input
                  ref={this.input}
                  label="URL"
                  value={value}
                  onChange={e => {
                    const newValue = e.target.value

                    this.setState({ value: newValue })
                    this.handleChange(newValue)
                  }}
                />
              </React.Fragment>
            )
          : null}
      </React.Fragment>
    )
  }
}

class DefaultRendererComponent extends React.Component<NodeRendererProps> {
  public render() {
    const { children, node } = this.props
    const { data } = node as InlineJSON

    if (!data) {
      return null
    }

    const href = data.href as string

    return <a href={href}>{children}</a>
  }
}

export const isLink = (change: Change) => {
  return change.value.inlines.some(inline =>
    inline ? inline.type === linkNode : false
  )
}

export const unwrapLink = (change: Change) => {
  return change.unwrapInline(linkNode)
}

export const wrapLink = (data: { href: string } = { href: '' }) => (
  change: Change
) => {
  if (change.value.selection.isExpanded) {
    return unwrapLink(change)
      .wrapInline({
        type: linkNode,
        data
      })
      .moveToEnd()
  }

  return change
    .insertText(' ')
    .moveFocusBackward(1)
    .wrapInline({
      type: linkNode,
      data
    })
    .moveToStart()
}

export const createLinkPlugin = ({
  EditorComponent = DefaultEditorComponent,
  RenderComponent = DefaultRendererComponent
}: LinkPluginOptions = {}): TextPlugin => {
  return {
    deserialize(el, next) {
      if (el.tagName.toLowerCase() === 'a') {
        // @ts-ignore
        const attr = el.attrs.find(({ name }) => name === 'href')

        return {
          object: 'inline',
          type: linkNode,
          nodes: next(el.childNodes),
          data: Data.create({
            href: attr ? attr.value : ''
          })
        }
      }

      return undefined
    },

    serialize(obj, children) {
      const block = obj as Inline

      if (block.object === 'inline' && block.type === linkNode) {
        return <RenderComponent node={obj}>{children}</RenderComponent>
      }

      return undefined
    },

    renderNode(props) {
      // @ts-ignore FIXME
      const block = props.node as Inline

      if (block.object === 'inline' && block.type === linkNode) {
        return <EditorComponent {...props} />
      }

      return undefined
    }
  }
}
