import * as R from 'ramda'
import * as React from 'react'
import { Change, Block, Node, Value, BlockJSON } from 'slate'
import { RenderNodeProps } from 'slate-react'

import { SlatePlugin, SerializeNodeProps } from '../..'
import { List } from 'immutable'

export const unorderedListNode = '@splish-me/ul'
export const orderedListNode = '@splish-me/ol'
export const listItemNode = '@splish-me/li'

export interface ListsPluginOptions {
  EditorComponent?: React.ComponentType<RenderNodeProps>
  RenderComponent?: React.ComponentType<SerializeNodeProps>
}

export const isUnorderedList = (change: Change) => {
  const isList = change.value.blocks.some(
    block => (block ? block.type === listItemNode : false)
  )
  const isActive = change.value.blocks.some(
    block =>
      block
        ? !!change.value.document.getClosest(
            block.key,
            // @ts-ignore
            parent => parent.type === unorderedListNode
          )
        : false
  )

  return isList && isActive
}

export const isOrderedList = (change: Change) => {
  const isList = change.value.blocks.some(
    block => (block ? block.type === listItemNode : false)
  )
  const isActive = change.value.blocks.some(
    block =>
      block
        ? !!change.value.document.getClosest(
            block.key,
            // @ts-ignore
            parent => parent.type === orderedListNode
          )
        : false
  )

  return isList && isActive
}

export const createToggleUnorderedList = (defaultNode: string) => (
  change: Change
) => {
  const isList = change.value.blocks.some(
    block => (block ? block.type === listItemNode : false)
  )
  const isActive = change.value.blocks.some(
    block =>
      block
        ? !!change.value.document.getClosest(
            block.key,
            parent => (parent as Block).type === unorderedListNode
          )
        : false
  )

  if (isList && isActive) {
    change
      .setBlocks(defaultNode)
      .unwrapBlock(unorderedListNode)
      .unwrapBlock(orderedListNode)
  } else if (isList) {
    change.unwrapBlock(orderedListNode).wrapBlock(unorderedListNode)
  } else {
    change.setBlocks(listItemNode).wrapBlock(unorderedListNode)
  }

  return change
}

export const createToggleOrderedList = (defaultNode: string) => (
  change: Change
) => {
  const isList = change.value.blocks.some(
    block => (block ? block.type === listItemNode : false)
  )
  const isActive = change.value.blocks.some(
    block =>
      block
        ? !!change.value.document.getClosest(
            block.key,
            parent => (parent as Block).type === orderedListNode
          )
        : false
  )

  if (isList && isActive) {
    change
      .setBlocks(defaultNode)
      .unwrapBlock(unorderedListNode)
      .unwrapBlock(orderedListNode)
  } else if (isList) {
    change.unwrapBlock(unorderedListNode).wrapBlock(orderedListNode)
  } else {
    change.setBlocks(listItemNode).wrapBlock(orderedListNode)
  }

  return change
}

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
    deserialize(el, next) {
      switch (el.tagName.toLowerCase()) {
        case 'ul':
          return {
            object: 'block',
            type: unorderedListNode,
            nodes: next(el.childNodes)
          }
        case 'ol':
          return {
            object: 'block',
            type: orderedListNode,
            nodes: next(el.childNodes)
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
      const node = obj as Block

      if (
        node.object === 'block' &&
        R.contains(node.type, [
          unorderedListNode,
          orderedListNode,
          listItemNode
        ])
      ) {
        return <RenderComponent node={node}>{children}</RenderComponent>
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
