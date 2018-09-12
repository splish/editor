import * as React from 'react'
import { Mark, Change } from 'slate'
import { RenderMarkProps } from 'slate-react'

import { SlatePlugin, SerializeMarkProps } from '..'

export const codeMark = '@splish-me/code'

export interface CodePluginOptions {
  EditorComponent?: React.ComponentType<RenderMarkProps>
  RenderComponent?: React.ComponentType<SerializeMarkProps>
}

export const isCode = (change: Change) => {
  return change.value.activeMarks.some(
    mark => (mark ? mark.type === codeMark : false)
  )
}

export const toggleCode = (change: Change) => {
  return change.toggleMark(codeMark)
}

class DefaultEditorComponent extends React.Component<RenderMarkProps> {
  public render() {
    const { attributes, mark, children } = this.props

    switch (mark.type) {
      case codeMark:
        return <code {...attributes}>{children}</code>
      default:
        return null
    }
  }
}

class DefaultRendererComponent extends React.Component<SerializeMarkProps> {
  public render() {
    const { mark, children } = this.props

    switch (mark.type) {
      case codeMark:
        return <code>{children}</code>
      default:
        return null
    }
  }
}

export const createCodePlugin = ({
  EditorComponent = DefaultEditorComponent,
  RenderComponent = DefaultRendererComponent
}: CodePluginOptions = {}): SlatePlugin => {
  return {
    deserialize(el, next) {
      switch (el.tagName.toLowerCase()) {
        case 'code':
          return {
            object: 'mark',
            type: codeMark,
            nodes: next(el.childNodes)
          }
        default:
          return undefined
      }
    },

    serialize(obj, children) {
      const mark = obj as Mark

      if (mark.object === 'mark' && mark.type === codeMark) {
        return <RenderComponent mark={mark}>{children}</RenderComponent>
      }

      return undefined
    },

    renderMark(props) {
      const { mark } = props

      if (mark.object === 'mark' && mark.type === codeMark) {
        return <EditorComponent {...props} />
      }

      return undefined
    }
  }
}
