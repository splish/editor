import * as React from 'react'
import { Block, Change } from 'slate'
import { RenderNodeProps } from 'slate-react'

import { SerializeNodeProps, SlatePlugin } from '..'

export const paragraphNode = '@splish-me/p'

export const setParagraph = (change: Change) => {
  return change.setBlocks(paragraphNode)
}

export interface ParagraphPluginOptions {
  EditorComponent?: React.ComponentType<RenderNodeProps>
  RenderComponent?: React.ComponentType<SerializeNodeProps>
}

class DefaultEditorComponent extends React.Component<RenderNodeProps> {
  public render() {
    const { attributes, children } = this.props

    return <p {...attributes}>{children}</p>
  }
}

class DefaultRendererComponent extends React.Component<SerializeNodeProps> {
  public render() {
    const { children } = this.props

    return <p>{children}</p>
  }
}

export const createParagraphPlugin = ({
  EditorComponent = DefaultEditorComponent,
  RenderComponent = DefaultRendererComponent
}: ParagraphPluginOptions = {}): SlatePlugin => {
  return {
    deserialize(el, next) {
      if (el.tagName.toLowerCase() === 'p') {
        return {
          object: 'block',
          type: paragraphNode,
          nodes: next(el.childNodes)
        }
      }

      return undefined
    },

    serialize(obj, children, key) {
      const block = obj as Block

      if (block.object === 'block' && block.type === paragraphNode) {
        return (
          <RenderComponent key={key} node={obj}>
            {children}
          </RenderComponent>
        )
      }

      return undefined
    },

    renderNode(props) {
      const block = props.node as Block

      if (block.object === 'block' && block.type === paragraphNode) {
        return <EditorComponent {...props} />
      }

      return undefined
    }
  }
}
