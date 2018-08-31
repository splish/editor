import { css } from 'emotion'
import * as React from 'react'

export interface SidebarTextfieldProps {
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  type?: string
}
export default class SidebarTextfield extends React.Component<
  SidebarTextfieldProps
> {
  public render() {
    const { value, onChange, label, placeholder, type, ...props } = this.props
    return (
      <label
        className={css({
          color: '#EEEEEE',
          margin: '20px auto 0px',
          padding: '0 10%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <span className={css({ width: '40%' })}>{label}</span>
        <input
          type={type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          className={css({
            backgroundColor: '#333333',
            border: 'none',
            borderBottom: '2px solid #EEEEEE',
            color: '#EEEEEE',
            width: '60%',
            '&:focus': {
              outline: 'none',
              borderBottom: '2px solid #469BFF'
            }
          })}
          {...props}
        />
      </label>
    )
  }
}
