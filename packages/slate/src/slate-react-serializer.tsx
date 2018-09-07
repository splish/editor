/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0-or-later
 * @copyright 2018 Splish UG (haftungsbeschränkt)
 * @author Splish UG (haftungsbeschränkt)
 */
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
