import { MarkJSON, NodeJSON } from 'slate'
import { Rule } from 'slate-html-serializer'
import { Plugin, RenderMarkProps, RenderNodeProps } from 'slate-react'

export type MarkEditorProps = RenderMarkProps

export interface MarkRendererProps {
  mark: MarkJSON
}

export type NodeEditorProps = RenderNodeProps

export interface NodeRendererProps {
  node: NodeJSON
}

export type TextPlugin = Plugin & Rule
