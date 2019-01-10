import * as React from 'react'

export * from './button'
export * from './dropdown'

export const renderIntoToolbar = (children: React.ReactNode) => {
  return <div>{children}</div>
}
