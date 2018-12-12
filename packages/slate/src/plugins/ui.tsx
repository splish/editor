import { renderIntoSidebar } from '@splish-me/editor-ui/plugin-sidebar.component'
import * as React from 'react'
import { RenderAttributes } from 'slate-react'

import { SlatePlugin } from '..'

export interface UiPluginOptions {
  // FIXME: type not strict enough
  Component: React.ComponentType<RenderAttributes>
  defaultNode: string
}

export const createUiPlugin = (options: UiPluginOptions): SlatePlugin => {
  const { Component, defaultNode } = options

  return {
    renderEditor(props) {
      // @ts-ignore FIXME
      const { focused, children } = props

      return (
        <React.Fragment>
          {children}
          {focused
            ? renderIntoSidebar(
                <Component defaultNode={defaultNode} {...props} />
              )
            : null}
        </React.Fragment>
      )
    }
  }
}
