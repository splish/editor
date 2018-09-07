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
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 * @copyright 2018 Splish UG (haftungsbeschränkt)
 * @author Splish UG (haftungsbeschränkt)
 */
/* eslint-disable no-alert, prefer-reflect */
import React from 'react'
import Plugin from '../Plugin'
import { Button } from '@splish-me/editor-ui/lib/sidebar-elements/button'

import Katex from './katex'

// import './index.css'
// import 'katex/dist/katex.min.css'
export const KATEX_BLOCK = 'KATEX/BLOCK'
export const KATEX_INLINE = 'KATEX/INLINE'

export default class KatexPlugin extends Plugin {
  constructor(props) {
    super(props)
    this.DEFAULT_NODE = props.DEFAULT_NODE
  }
  // eslint-disable-next-line react/display-name
  Button = ({ editorState, onChange }) => {
    const onClick = e => {
      e.preventDefault()
      const hasBlock = editorState.blocks.some(
        block => block.type === KATEX_BLOCK
      )
      const hasInline = editorState.inlines.some(
        (inline: any) => inline.type === KATEX_INLINE
      )
      let newState
      if (hasBlock) {
        newState = editorState.change().deleteBackward()
      } else if (hasInline) {
        newState = editorState.change().deleteBackward()
      } else {
        newState = editorState.change().insertInline({
          type: KATEX_INLINE,
          data: { formula: '', inline: true },
          isVoid: true
        })
      }
      onChange(newState)
    }
    /*        const blocks = editorState.blocks.filter((block) => block.type === KATEX_BLOCK)
     const inlineBlocks = editorState.blocks.filter((inline) => inline.type === KATEX_INLINE)
     */
    const hasMath = editorState.blocks.some(block => block.type === KATEX_BLOCK)
    const hasInline = editorState.inlines.some(
      inline => inline.type === KATEX_INLINE
    )

    return (
      <Button active={hasMath || hasInline} onClick={onClick}>
        Katex
      </Button>
    )
  }
  name = 'katex'

  renderNode = props => {
    const { children } = props
    switch (props.node.type) {
      case KATEX_BLOCK:
      case KATEX_INLINE:
        return <Katex {...props}>{children}</Katex>
    }
  }

  toolbarButtons = [this.Button]

  deserialize(el, next) {
    switch (el.tagName.toLowerCase()) {
      case 'katexblock':
        return {
          kind: 'block',
          type: KATEX_BLOCK,
          isVoid: true,
          data: {
            formula: el.childNodes[0].value,
            inline: false
          }
        }
      case 'katexinline':
        return {
          kind: 'inline',
          type: KATEX_INLINE,
          isVoid: true,
          data: {
            formula: el.childNodes[0].value,
            inline: true
          }
        }
    }
  }

  serialize(object, children) {
    if (object.kind !== 'block') {
      return
    }
    switch (object.type) {
      case KATEX_BLOCK:
        return <katexblock>{children}</katexblock>
      case KATEX_INLINE:
        return <katexinline>{children}</katexinline>
    }
  }
}
