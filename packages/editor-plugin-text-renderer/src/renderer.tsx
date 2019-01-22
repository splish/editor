import { TextPlugin } from '@splish-me/editor-plugin-text-plugin'
import * as React from 'react'
import { LeafJSON, NodeJSON } from 'slate'

import { TextPluginSerializedState } from './types'

export class Renderer extends React.Component<RendererProps> {
  public render() {
    const { value } = this.props

    if (!value) {
      return null
    }

    const { document } = value

    if (!document) {
      return null
    }

    return (document.nodes || []).map(this.serializeNode).filter(Boolean)
  }

  private serializeNode = (node: NodeJSON, key: number): React.ReactNode => {
    if (node.object === 'text') {
      return node.leaves.map(this.serializeLeaf)
    }

    const children = (node.nodes || []).map(this.serializeNode)

    for (const rule of this.props.rules) {
      if (!rule) {
        continue
      }

      // @ts-ignore FIXME: serialize should expect children to be usual React Children i.e. array and stuff
      const ret = rule(node, children)
      if (ret === null) return
      if (ret) return <React.Fragment key={key}>{ret}</React.Fragment>
    }

    // @ts-ignore
    throw new Error(`No serializer defined for node of type "${node.type}".`)
  }

  private serializeLeaf = (leaf: LeafJSON, key: number): React.ReactNode => {
    if (!leaf.text) {
      return null
    }

    const string = { object: 'string' as 'string', text: leaf.text }
    const text = this.serializeString(string, key)

    return (leaf.marks || []).reduce((children, mark) => {
      for (const rule of this.props.rules) {
        if (!rule) {
          continue
        }

        // @ts-ignore FIXME: serialize should expect children to be usual React Children i.e. array and stuff
        const ret = rule(mark, children)
        if (ret === null) return
        if (ret) return <React.Fragment key={key}>{ret}</React.Fragment>
      }

      throw new Error(`No serializer defined for mark of type "${mark.type}".`)
    }, text)
  }

  private serializeString = (
    string: { object: 'string'; text: string },
    key: number
  ): React.ReactNode => {
    for (const rule of this.props.rules) {
      if (!rule) {
        continue
      }

      const ret = rule(string, string.text)
      if (ret) return <React.Fragment key={key}>{ret}</React.Fragment>
    }

    return string.text
  }
}

export interface RendererProps {
  value: TextPluginSerializedState['editorState']
  rules: Array<TextPlugin['serialize']>
}
