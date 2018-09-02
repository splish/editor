/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

// @flow
// TODO lint: prefer-reflect doesn't work with slate state #158
/* eslint no-duplicate-imports: ["off"] */
/* eslint prefer-reflect: ["off"] */
import Subject from '@material-ui/icons/Subject'
import { pathOr } from 'ramda'
import Html from 'slate-html-serializer'
import React from 'react'
import { ActionTypes } from 'redux-undo'
import Component from './Component'
import type { Props } from './Component'
import Plugin from './plugins/Plugin'
// import KatexPlugin from './plugins/katex'
import * as hooks from './hooks'
import parse5 from 'parse5'
import v002 from './migrations/v002'
import { Renderer } from './slate-react-serializer'
import { EM, STRONG, U } from './plugins/emphasize'
import { P } from './plugins/paragraph'
import { UL, OL, LI } from './plugins/lists'
import { H1, H2, H3, H4, H5, H6 } from './plugins/headings'
import { BLOCKQUOTE } from './plugins/blockquote'
import { A } from './plugins/link'
import { KATEX_BLOCK, KATEX_INLINE } from './plugins/katex'
import { CODE } from './plugins/code'
import MathComponent from './plugins/katex/math-component'

export const createInitialState = hooks.createInitialState

export const html = hooks.html
export const defaultPlugins = hooks.defaultPlugins

export default (plugins: Plugin[] = hooks.defaultPlugins) => {
  const props = {}
  props.plugins = plugins
  props.onKeyDown = (
    e: Event,
    data: { key: string, isMod: boolean, isShift: boolean },
    state: any
  ) => {
    // we need to prevent slate from handling undo and redo
    if (data.isMod && (data.key === 'z' || data.key === 'y')) {
      return state
    }

    if (data.isShift && data.key === 'enter') {
      return state.change().insertText('\n').value
    }

    for (let i = 0; i < plugins.length; i++) {
      const { onKeyDown } = plugins[i]
      const newState = onKeyDown && onKeyDown(e, data, state)

      if (newState) {
        return newState
      }
    }

    return
  }

  const HoverButtons = ({ editorState, onChange, focus }: Props) => (
    <div>
      {plugins.map((plugin: Plugin, i: number) =>
        plugin.hoverButtons.map((Button: any, j: number) => (
          <Button
            key={`${i}-${j}`}
            editorState={editorState}
            onChange={onChange}
            focus={focus}
          />
        ))
      )}
    </div>
  )
  props.HoverButtons = HoverButtons

  const ToolbarButtons = ({ editorState, onChange, focus }: Props) => (
    <div>
      {plugins.map((plugin: Plugin, i: number) =>
        plugin.toolbarButtons.map((Button: any, j: number) => (
          <Button
            key={`${i}-${j}`}
            editorState={editorState}
            onChange={onChange}
            focus={focus}
          />
        ))
      )}
    </div>
  )
  props.ToolbarButtons = ToolbarButtons

  const Slate = (cellProps: Props) => <Component {...cellProps} {...props} />
  const StaticComponent = ({
    state: { editorState, importFromHtml } = {}
  }: Props) => {
    return (
      <Renderer
        value={editorState}
        rules={[
          (node, props) => {
            switch (node.object) {
              case 'mark': {
                switch (node.type) {
                  case EM:
                    return <em {...props} />
                  case STRONG:
                    return <strong {...props} />
                  case U:
                    return <u {...props} />
                  case CODE:
                    return <code {...props} />
                }
              }
              case 'block': {
                const { data } = node
                const textAlign = data.get('align')

                const p = {
                  ...props,
                  style: textAlign ? { textAlign } : undefined
                }

                switch (node.type) {
                  case P:
                  // FIXME: why does this even exist
                  case 'paragraph':
                    return <p {...p} />
                  case UL:
                    return <ul {...p} />
                  case OL:
                    return <ol {...p} />
                  case LI:
                    return <li {...p} />
                  case H1:
                    return <h1 {...p} />
                  case H2:
                    return <h2 {...p} />
                  case H3:
                    return <h3 {...p} />
                  case H4:
                    return <h4 {...p} />
                  case H5:
                    return <h5 {...p} />
                  case H6:
                    return <h6 {...p} />
                  case BLOCKQUOTE:
                    return <blockquote {...p} />
                  case CODE:
                    return <pre {...p} />
                }
              }
              case 'inline': {
                const { data } = node

                switch (node.type) {
                  case A:
                    return <a href={data.get('href')} {...props} />
                  case KATEX_BLOCK:
                    return (
                      <MathComponent formula={data.get('formula')} {...props} />
                    )
                  case KATEX_INLINE:
                    return (
                      <MathComponent
                        inline
                        formula={data.get('formula')}
                        {...props}
                      />
                    )
                }
              }
            }
          }
        ]}
      />
    )
    // <div
    //   className="ory-plugins-content-slate-container"
    //   dangerouslySetInnerHTML={{ __html: importFromHtml }}
    // />
    // return (
    //   <div
    //     className="ory-plugins-content-slate-container"
    //     dangerouslySetInnerHTML={{ __html: html.serialize(editorState) }}
    //   />
    // )
  }
  return {
    Component: Slate,
    StaticComponent,

    name: 'ory/editor/core/content/slate',
    version: '0.0.2',
    IconComponent: <Subject />,
    text: 'Text',
    description: 'An advanced rich text area.',

    allowInlineNeighbours: true,

    handleFocus: (props: Props, source: string) => {
      if (source === 'onMouseDown') {
        return
      } else if (props.state.editorState.isFocused) {
        return
      }

      setTimeout(() => {
        props.state.editorState.change().focus()
      }, 0)
    },

    handleBlur: (props: Props) => {
      if (!props.state.editorState.isFocused) {
        return
      }

      props.onChange({
        editorState: props.state.editorState.change().blur().value
      })
    },

    reducer: (state: any, action: any) => {
      if (
        (action.type === ActionTypes.UNDO ||
          action.type === ActionTypes.REDO) &&
        pathOr(false, ['content', 'state', 'editorState'], state)
      ) {
        return {
          ...state,
          content: {
            ...state.content,
            state: {
              ...state.content.state,
              editorState: state.content.state.editorState.merge({
                isNative: false
              })
            }
          }
        }
      }
      return state
    },

    handleRemoveHotKey: hooks.handleRemoveHotKey,
    handleFocusPreviousHotKey: hooks.handleFocusPreviousHotKey,
    handleFocusNextHotKey: hooks.handleFocusNextHotKey,

    createInitialState: hooks.createInitialState,
    serialize: hooks.serialize,
    unserialize: hooks.unserialize,

    // TODO this is disabled because of #207
    // merge = hooks.merge
    // split = hooks.split

    migrations: [v002]
  }
}
