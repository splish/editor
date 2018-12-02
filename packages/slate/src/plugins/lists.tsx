import * as R from 'ramda'
import * as React from 'react'
import { Change, Block, BlockJSON } from 'slate'
import { RenderNodeProps } from 'slate-react'
import createListPlugin from 'front-slate-edit-list'

import { SlatePlugin, SerializeNodeProps } from '../..'
import { defaultNode } from '../default-node'

export const unorderedListNode = '@splish-me/ul'
export const orderedListNode = '@splish-me/ol'
export const listItemNode = '@splish-me/li'

const plugin = createListPlugin({
  types: [orderedListNode, unorderedListNode],
  typeItem: listItemNode,
  typeDefault: defaultNode
})

export interface ListsPluginOptions {
  EditorComponent?: React.ComponentType<RenderNodeProps>
  RenderComponent?: React.ComponentType<SerializeNodeProps>
}

export const isUnorderedList = (change: Change) => {
  return plugin.utils.isSelectionInList(change.value, unorderedListNode)
}

export const isOrderedList = (change: Change) => {
  return plugin.utils.isSelectionInList(change.value, orderedListNode)
}

const createToggleList = (type: unorderedListNode | orderedListNode) => (change: Change) => {
  const isSomeList = plugin.utils.isSelectionInList(change.value)
  const isThatList = plugin.utils.isSelectionInList(change.value, type)

  if (isSomeList) {
    change.call(plugin.changes.unwrapList)
  }

  if (!isThatList) {
    change.call((change) => plugin.changes.wrapInList(change, type))
  }

  return change
}

export const toggleUnorderedList = createToggleList(unorderedListNode)
export const toggleOrderedList = createToggleList(orderedListNode)

class DefaultEditorComponent extends React.Component<RenderNodeProps> {
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

class DefaultRendererComponent extends React.Component<SerializeNodeProps> {
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
}: ListsPluginOptions = {}): SlatePlugin => {
  return {
    ...plugin,
    deserialize(el, next) {
      switch (el.tagName.toLowerCase()) {
        case 'ul':
          return {
            object: 'block',
            type: unorderedListNode,
            nodes: next(el.childNodes.filter(node => node.nodeName !== '#text'))
          }
        case 'ol':
          return {
            object: 'block',
            type: orderedListNode,
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

    serialize(obj, children, key) {
      const node = obj as Block

      if (
        node.object === 'block' &&
        R.contains(node.type, [
          unorderedListNode,
          orderedListNode,
          listItemNode
        ])
      ) {
        return (
          <RenderComponent key={key} node={node}>
            {children}
          </RenderComponent>
        )
      }

      return undefined
    },

    renderNode(props) {
      const { node } = props

      if (
        node.object === 'block' &&
        R.contains(node.type, [
          unorderedListNode,
          orderedListNode,
          listItemNode
        ])
      ) {
        return <EditorComponent {...props} />
      }

      return undefined
    }
  }
}
