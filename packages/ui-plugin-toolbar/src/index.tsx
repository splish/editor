import * as React from 'react'
import { Sticky, StickyContainer } from 'react-sticky'
export * from './button'
export * from './dropdown'

export const renderIntoToolbar = (children: React.ReactNode) => {
  return (
    <Sticky>
      {({
        style,
        isSticky
      }: {
        style: React.CSSProperties
        isSticky: boolean
      }) => {
        return isSticky ? (
          <div style={{ ...style }}>{children}</div>
        ) : (
          <div>{children}</div>
        )
      }}
    </Sticky>
  )
}
