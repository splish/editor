import * as R from 'ramda'
import * as React from 'react'

import * as S from './slate-plugin.interface'

export interface RendererProps {
  value: {
    document: {
      object: 'document'
      nodes: S.SlateNode[]
    }
  }
  rules: Array<S.SlateRendererRule>
}

const mapIndexed = R.addIndex<any, React.ReactNode>(R.map)

export class Renderer extends React.Component<RendererProps> {
  public render() {
    const { value } = this.props
    const { document } = value

    const elements = R.filter(
      Boolean,
      mapIndexed(this.serializeNode, document.nodes)
    )

    return elements
  }

  private serializeNode = (node: S.SlateNode, key: number): React.ReactNode => {
    if (node.object === 'text') {
      return mapIndexed(this.serializeLeaf, node.leaves)
    }

    const children = mapIndexed(this.serializeNode, node.nodes)

    for (const rule of this.props.rules) {
      const ret = rule(node, { key: key.toString(), children })
      if (ret === null) return
      if (ret) return ret
    }

    throw new Error(`No serializer defined for node of type "${node.type}".`)
  }

  private serializeLeaf = (leaf: S.SlateLeaf, key: number): React.ReactNode => {
    const string: S.SlateString = { object: 'string', text: leaf.text }
    const text = this.serializeString(string)

    return R.reduce(
      (children, mark) => {
        for (const rule of this.props.rules) {
          const ret = rule(mark, { key: key.toString(), children })
          if (ret === null) return
          if (ret) return ret
        }

        throw new Error(
          `No serializer defined for mark of type "${mark.type}".`
        )
      },
      text,
      leaf.marks
    )
  }

  private serializeString = (string: S.SlateString): React.ReactNode => {
    for (const rule of this.props.rules) {
      const ret = rule(string, { children: string.text })
      if (ret) return ret
    }

    return string.text
  }
}
