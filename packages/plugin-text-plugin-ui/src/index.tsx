import { TextPlugin } from '@splish-me/editor-plugin-text-plugin'
import { renderIntoSidebar } from '@splish-me/editor-ui-plugin-sidebar'
import * as React from 'react'
import { RenderAttributes } from 'slate-react'

export interface UiPluginOptions {
  // FIXME: type not strict enough
  Component: React.ComponentType<RenderAttributes>
}

export const createUiPlugin = (options: UiPluginOptions): TextPlugin => {
  const { Component } = options

  return {
    renderEditor(props) {
      // @ts-ignore FIXME
      const { focused, children } = props

      return (
        <React.Fragment>
          {children}
          {focused ? renderIntoSidebar(<Component {...props} />) : null}
        </React.Fragment>
      )
    }
  }
}
