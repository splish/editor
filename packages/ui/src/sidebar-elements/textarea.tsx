import { css } from 'emotion'
import * as React from 'react'

export interface SidebarTextareaProps {
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
}
export default class SidebarTextarea extends React.Component<
  SidebarTextareaProps
> {
  public render() {
    const { value, label, innerRef, placeholder, ...props } = this.props
    return (
      <label
        className={css({
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          margin: '20px auto 0px',
          padding: '0 10%',
          alignItems: 'stretch'
        })}
      >
        <span>{label}</span>
        <textarea
          value={value}
          placeholder={placeholder}
          className={css({
            backgroundColor: '#EEEEEE',
            border: 'none',
            marginTop: '5px',
            borderRadius: '5px',
            color: '#333333',
            resize: 'none',
            outline: 'none',
            minHeight: '100px',
            '&:focus': {
              border: '2px solid #469BFF'
            }
          })}
          ref={innerRef}
          {...props}
        />
      </label>
    )
  }
}
