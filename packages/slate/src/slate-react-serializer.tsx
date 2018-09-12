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
import { Rule } from 'slate-html-serializer'
import { SlatePluginSerializedState } from '.'
import { NodeJSON, LeafJSON } from 'slate'

export interface RendererProps {
  value: SlatePluginSerializedState['editorState']
  rules: Array<Rule['serialize']>
}

const mapIndexed = R.addIndex<any, React.ReactNode>(R.map)

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

    const elements = (document.nodes || [])
      .map(this.serializeNode)
      .filter(Boolean)

    return elements
  }

  private serializeNode = (node: NodeJSON, key: number): React.ReactNode => {
    if (node.object === 'text') {
      return mapIndexed(this.serializeLeaf, node.leaves)
    }

    const children = (node.nodes || []).map(this.serializeNode)

    for (const rule of this.props.rules) {
      if (!rule) {
        continue
      }

      // @ts-ignore FIXME: serialize should expect children to be usual React Children i.e. array and stuff
      const ret = rule(node, children)
      if (ret === null) return
      if (ret) return ret
    }

    // @ts-ignore
    throw new Error(`No serializer defined for node of type "${node.type}".`)
  }

  private serializeLeaf = (leaf: LeafJSON, key: number): React.ReactNode => {
    if (!leaf.text) {
      return null
    }

    const string: S.SlateString = { object: 'string', text: leaf.text }
    const text = this.serializeString(string)

    return R.reduce(
      (children, mark) => {
        for (const rule of this.props.rules) {
          if (!rule) {
            continue
          }

          // @ts-ignore FIXME: serialize should expect children to be usual React Children i.e. array and stuff
          const ret = rule(mark, children)
          if (ret === null) return
          if (ret) return ret
        }

        throw new Error(
          `No serializer defined for mark of type "${mark.type}".`
        )
      },
      text,
      leaf.marks || []
    )
  }

  private serializeString = (string: S.SlateString): React.ReactNode => {
    for (const rule of this.props.rules) {
      if (!rule) {
        continue
      }

      const ret = rule(string, string.text)
      if (ret) return ret
    }

    return string.text
  }
}
