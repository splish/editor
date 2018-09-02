// @ts-ignore
import { Change } from 'slate'
// @ts-ignore
import { Editor } from 'slate-react'

type SlateEventHandler = (
  event: Event,
  change: Change,
  editor: Editor
) => Change | void

interface SlateSchemaRule {
  data?: { [dataAttribute: string]: (value: any) => boolean }
  first?: {
    types?: string[]
    objects?: string[]
  }
  isVoid?: boolean
  last?: {
    types?: string[]
    objects?: string[]
  }
  nodes?: Array<{
    types?: string[]
    objects?: string[]
    min: number
    max: number
  }>
  normalize?: (change: Change, violation: string, context: any) => void
  parent?: {
    types?: string[]
  }
  text?: RegExp
}

export interface SlatePlugin<C> {
  /** Slate Event Handlers, see https://docs.slatejs.org/slate-react/plugins#event-handler-properties */
  onBeforeInput?: SlateEventHandler
  onBlur?: SlateEventHandler
  onFocus?: SlateEventHandler
  onCopy?: SlateEventHandler
  onCut?: SlateEventHandler
  onDrop?: SlateEventHandler
  onKeyDown?: SlateEventHandler
  onKeyUp?: SlateEventHandler
  onPaste?: SlateEventHandler
  onSelect?: SlateEventHandler

  /** Slate rendering, see https://docs.slatejs.org/guides/rendering */
  renderNode?: (
    props: {
      node: SlateNode
      attributes: {}
      children: React.ReactNode
    }
  ) => React.ReactNode | void
  renderMark?: (
    props: {
      mark: SlateMark
      attributes: {}
      children: React.ReactNode
    }
  ) => React.ReactNode | void
  renderEditor?: (props: any, editor: Editor) => React.ReactNode

  /** Other Slate properties, see https://docs.slatejs.org/slate-react/plugins#other-properties */
  onChange?: (change: Change) => void
  schema?: {
    document?: SlateSchemaRule
    blocks?: { [blockType: string]: SlateSchemaRule }
    inlines?: { [inlineType: string]: SlateSchemaRule }
  }

  /** Custom props for ory-editor-slate */
  changes: C

  // helpers?: {
  //   [key: string]: (
  //     args: { marks: { [key: string]: string } }
  //   ) => (...args: any[]) => any
  // }
}

export type SlatePluginFactory<
  O = {},
  C extends {
    [key: string]: (change: Change, ...args: any[]) => Change | void
  } = {}
> = (options: O) => SlatePlugin<C>

export interface SlateLeaf {
  text: string
  marks: SlateMark[]
}

export interface SlateMark {
  object: 'mark'
  type: string
}

export interface SlateText {
  object: 'text'
  leaves: SlateLeaf[]
}

export interface SlateBlock {
  object: 'block'
  nodes: SlateNode[]
  type: string
}

export interface SlateInline {
  object: 'inline'
  nodes: (SlateInline | SlateText)[]
  type: string
}

export type SlateNode = SlateBlock | SlateInline | SlateText

export interface SlateString {
  object: 'string'
  text: string
}

export interface SlateMark {
  object: 'mark'
  type: string
  data: any
}

export type SlateRendererRule = (
  node: SlateBlock | SlateInline | SlateText | SlateMark | SlateString,
  props: { key?: string; children?: React.ReactNode }
) => React.ReactNode | undefined

export type SlateRendererRuleFactory<O = {}> = (options: O) => SlateRendererRule
