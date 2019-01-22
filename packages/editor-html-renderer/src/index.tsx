import { createRenderer } from '@splish-me/editor-renderer'
import createClassName from 'classnames'
import * as React from 'react'

const gridClass = (size: number = 12): string =>
  `ory-cell-sm-${size} ory-cell-xs-12`

export const HtmlRenderer = createRenderer({
  renderContainer({ children }) {
    return <div className="ory-row">{children}</div>
  },
  renderRow({ children }) {
    return <div className="ory-row">{children}</div>
  },
  renderCell({ cell, children }) {
    const className = createClassName('ory-cell', gridClass(cell.size))

    return (
      <div className={className}>
        <div className="ory-cell-inner ory-cell-leaf">{children}</div>
      </div>
    )
  }
})
