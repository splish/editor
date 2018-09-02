import createClassName from 'classnames'
import * as React from 'react'

import { createRenderer } from './renderer.component'

const gridClass = (size: number = 12): string =>
  `ory-cell-sm-${size} ory-cell-xs-12`

export const HtmlRenderer = createRenderer({
  renderContainer({ children }) {
    return <div className="ory-row">{children}</div>
  },
  renderRow({ row, children }) {
    return (
      <div key={row.id} className="ory-row">
        {children}
      </div>
    )
  },
  renderCell({ cell, children }) {
    const className = createClassName('ory-cell', gridClass(cell.size))

    return (
      <div key={cell.id} className={className}>
        <div className="ory-cell-inner ory-cell-leaf">{children}</div>
      </div>
    )
  }
})
