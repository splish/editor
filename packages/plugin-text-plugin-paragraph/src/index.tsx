import * as React from 'react'
import { Block, Change } from 'slate'

import {
  NodeEditorProps,
  NodeRendererProps,
  TextPlugin
} from '@splish-me/editor-plugin-text-plugin'

export const paragraphNode = '@splish-me/p'

export const setParagraph = (change: Change) => {
  return change.setBlocks(paragraphNode)
}

export interface ParagraphPluginOptions {
  EditorComponent?: React.ComponentType<NodeEditorProps>
  RenderComponent?: React.ComponentType<NodeRendererProps>
}

class DefaultEditorComponent extends React.Component<NodeEditorProps> {
  public render() {
    const { attributes, children } = this.props

    return <p {...attributes}>{children}</p>
  }
}

class DefaultRendererComponent extends React.Component<NodeRendererProps> {
  public render() {
    const { children } = this.props

    return <p>{children}</p>
  }
}

export const createParagraphPlugin = ({
  EditorComponent = DefaultEditorComponent,
  RenderComponent = DefaultRendererComponent
}: ParagraphPluginOptions = {}): TextPlugin => {
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

    serialize(obj, children) {
      const block = obj as Block

      if (block.object === 'block' && block.type === paragraphNode) {
        return <RenderComponent node={obj}>{children}</RenderComponent>
      }

      return undefined
    },

    renderNode(props) {
      // @ts-ignore FIXME
      const block = props.node as Block

      if (block.object === 'block' && block.type === paragraphNode) {
        return <EditorComponent {...props} />
      }

      return undefined
    }
  }
}
