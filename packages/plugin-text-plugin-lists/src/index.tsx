import {
  defaultNode,
  NodeEditorProps,
  NodeRendererProps,
  TextPlugin
} from '@splish-me/editor-plugin-text-plugin'
// @ts-ignore FIXME
import createListPlugin from 'front-slate-edit-list'
import * as React from 'react'
import { Change, Block, BlockJSON } from 'slate'

export const unorderedListNode = '@splish-me/ul'
export const orderedListNode = '@splish-me/ol'
export const listItemNode = '@splish-me/li'

const plugin = createListPlugin({
  types: [orderedListNode, unorderedListNode],
  typeItem: listItemNode,
  typeDefault: defaultNode
})

export interface ListsPluginOptions {
  EditorComponent?: React.ComponentType<NodeEditorProps>
  RenderComponent?: React.ComponentType<NodeRendererProps>
}

export const isUnorderedList = (change: Change) => {
  return plugin.utils.isSelectionInList(change.value, unorderedListNode)
}

export const isOrderedList = (change: Change) => {
  return plugin.utils.isSelectionInList(change.value, orderedListNode)
}

const createToggleList = (
  type: typeof unorderedListNode | typeof orderedListNode
) => (change: Change) => {
  const isSomeList = plugin.utils.isSelectionInList(change.value)
  const isThatList = plugin.utils.isSelectionInList(change.value, type)

  if (isSomeList) {
    change.call(plugin.changes.unwrapList)
  }

  if (!isThatList) {
    change.call(change => plugin.changes.wrapInList(change, type))
  }

  return change
}

export const toggleUnorderedList = createToggleList(unorderedListNode)
export const toggleOrderedList = createToggleList(orderedListNode)

class DefaultEditorComponent extends React.Component<NodeEditorProps> {
  public render() {
    const { attributes, node, children } = this.props
    const block = node as Block

    switch (block.type) {
      case unorderedListNode:
        return <ul {...attributes}>{children}</ul>
      case orderedListNode:
        return <ol {...attributes}>{children}</ol>
      case listItemNode:
        return <li {...attributes}>{children}</li>
      default:
        return null
    }
  }
}

class DefaultRendererComponent extends React.Component<NodeRendererProps> {
  public render() {
    const { node, children } = this.props
    const block = node as BlockJSON

    switch (block.type) {
      case unorderedListNode:
        return <ul>{children}</ul>
      case orderedListNode:
        return <ol>{children}</ol>
      case listItemNode:
        return <li>{children}</li>
      default:
        return null
    }
  }
}

export const createListsPlugin = ({
  EditorComponent = DefaultEditorComponent,
  RenderComponent = DefaultRendererComponent
}: ListsPluginOptions = {}): TextPlugin => {
  return {
    ...plugin,
    deserialize(el, next) {
      switch (el.tagName.toLowerCase()) {
        case 'ul':
          return {
            object: 'block',
            type: unorderedListNode,
            // @ts-ignore FIXME
            nodes: next(el.childNodes.filter(node => node.nodeName !== '#text'))
          }
        case 'ol':
          return {
            object: 'block',
            type: orderedListNode,
            // @ts-ignore FIXME
            nodes: next(el.childNodes.filter(node => node.nodeName !== '#text'))
          }
        case 'li':
          return {
            object: 'block',
            type: listItemNode,
            nodes: next(el.childNodes)
          }
        default:
          return undefined
      }
    },

    serialize(obj, children) {
      const node = obj as BlockJSON

      if (
        node.object === 'block' &&
        [unorderedListNode, orderedListNode, listItemNode].indexOf(node.type) >
          -1
      ) {
        return <RenderComponent node={node}>{children}</RenderComponent>
      }

      return undefined
    },

    renderNode(props) {
      const { node } = props

      if (
        node.object === 'block' &&
        [unorderedListNode, orderedListNode, listItemNode].indexOf(node.type) >
          -1
      ) {
        return <EditorComponent {...props} />
      }

      return undefined
    }
  }
}
