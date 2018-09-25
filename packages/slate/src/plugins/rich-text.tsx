import * as R from 'ramda'
import * as React from 'react'
import { Mark, Change } from 'slate'
import { RenderMarkProps } from 'slate-react'

import { SlatePlugin, SerializeMarkProps } from '..'

export const strongMark = '@splish-me/strong'
export const emphasizeMark = '@splish-me/em'
export const underlineMark = '@splish-me/u'

export interface RichTextPluginOptions {
  EditorComponent?: React.ComponentType<RenderMarkProps>
  RenderComponent?: React.ComponentType<SerializeMarkProps>
}

export const isStrong = (change: Change) => {
  return change.value.activeMarks.some(
    mark => (mark ? mark.type === strongMark : false)
  )
}

export const isEmphasized = (change: Change) => {
  return change.value.activeMarks.some(
    mark => (mark ? mark.type === emphasizeMark : false)
  )
}

export const isUnderlined = (change: Change) => {
  return change.value.activeMarks.some(
    mark => (mark ? mark.type === underlineMark : false)
  )
}

export const toggleStrong = (change: Change) => {
  return change.toggleMark(strongMark)
}

export const toggleEmphasize = (change: Change) => {
  return change.toggleMark(emphasizeMark)
}

export const toggleUnderline = (change: Change) => {
  return change.toggleMark(underlineMark)
}

class DefaultEditorComponent extends React.Component<RenderMarkProps> {
  public render() {
    const { attributes, mark, children } = this.props

    switch (mark.type) {
      case strongMark:
        return <strong {...attributes}>{children}</strong>
      case emphasizeMark:
        return <em {...attributes}>{children}</em>
      case underlineMark:
        return <u {...attributes}>{children}</u>
      default:
        return null
    }
  }
}

class DefaultRendererComponent extends React.Component<SerializeMarkProps> {
  public render() {
    const { mark, children } = this.props

    switch (mark.type) {
      case strongMark:
        return <strong>{children}</strong>
      case emphasizeMark:
        return <em>{children}</em>
      case underlineMark:
        return <u>{children}</u>
      default:
        return null
    }
  }
}

export const createRichTextPlugin = ({
  EditorComponent = DefaultEditorComponent,
  RenderComponent = DefaultRendererComponent
}: RichTextPluginOptions = {}): SlatePlugin => {
  return {
    deserialize(el, next) {
      switch (el.tagName.toLowerCase()) {
        case 'strong':
        case 'b':
          return {
            object: 'mark',
            type: strongMark,
            nodes: next(el.childNodes)
          }
        case 'em':
        case 'i':
          return {
            object: 'mark',
            type: emphasizeMark,
            nodes: next(el.childNodes)
          }
        case 'u':
          return {
            object: 'mark',
            type: underlineMark,
            nodes: next(el.childNodes)
          }
        default:
          return undefined
      }
    },

    serialize(obj, children, key) {
      const mark = obj as Mark

      if (
        mark.object === 'mark' &&
        R.contains(mark.type, [strongMark, emphasizeMark, underlineMark])
      ) {
        return (
          <RenderComponent key={key} mark={mark}>
            {children}
          </RenderComponent>
        )
      }

      return undefined
    },

    renderMark(props) {
      const { mark } = props

      if (
        mark.object === 'mark' &&
        R.contains(mark.type, [strongMark, emphasizeMark, underlineMark])
      ) {
        return <EditorComponent {...props} />
      }

      return undefined
    }
  }
}
