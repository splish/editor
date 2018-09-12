import * as React from 'react'
import { Block, Change } from 'slate'
import { RenderNodeProps } from 'slate-react'

import { SerializeNodeProps, SlatePlugin } from '..'

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export const createHeadingNode = (level: HeadingLevel) => {
  return `@splish-me/h${level}`
}

export type HeadingsPluginOptions = {
  EditorComponent?: React.ComponentType<
    RenderNodeProps & { level: HeadingLevel }
  >
  RenderComponent?: React.ComponentType<
    SerializeNodeProps & { level: HeadingLevel }
  >
}

class DefaultEditorComponent extends React.Component<
  RenderNodeProps & { level: HeadingLevel }
> {
  public render() {
    const { attributes, children, level } = this.props
    const Heading = `h${level}`

    return <Heading {...attributes}>{children}</Heading>
  }
}

class DefaultRenderComponent extends React.Component<
  SerializeNodeProps & { level: HeadingLevel }
> {
  public render() {
    const { children, level } = this.props
    const Heading = `h${level}`

    return <Heading>{children}</Heading>
  }
}

export const createIsHeading = (level: HeadingLevel) => {
  return (change: Change) => {
    const type = createHeadingNode(level)

    return change.value.blocks.some(
      block => (block ? block.type === type : false)
    )
  }
}

export const createSetHeading = (level: HeadingLevel) => {
  return (change: Change) => {
    const type = createHeadingNode(level)
    return change.setBlocks(type)
  }
}

export const createHeadingsPlugin = ({
  EditorComponent = DefaultEditorComponent,
  RenderComponent = DefaultRenderComponent
}: HeadingsPluginOptions = {}): SlatePlugin => {
  return {
    deserialize(el, next) {
      const match = el.tagName.toLowerCase().match(/h([1-6])/)

      if (match) {
        const level = parseInt(match[1], 10) as HeadingLevel

        return {
          object: 'block',
          type: createHeadingNode(level),
          nodes: next(el.childNodes)
        }
      }

      return undefined
    },

    serialize(obj, children) {
      const block = obj as Block

      if (block.object === 'block') {
        const match = block.type.match(/@splish-me\/h([1-6])/)

        if (match) {
          const level = parseInt(match[1], 10) as HeadingLevel

          return (
            <RenderComponent level={level} node={obj}>
              {children}
            </RenderComponent>
          )
        }
      }

      return undefined
    },

    renderNode(props) {
      const block = props.node as Block

      if (block.object === 'block') {
        const match = block.type.match(/@splish-me\/h([1-6])/)

        if (match) {
          const level = parseInt(match[1], 10) as HeadingLevel

          return <EditorComponent level={level} {...props} />
        }
      }

      return undefined
    }
  }
}
