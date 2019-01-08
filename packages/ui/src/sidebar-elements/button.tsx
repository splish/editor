import { css } from 'emotion'
import * as React from 'react'

export default class ButtonGroup extends React.Component {
  render() {
    return (
      <div
        className={css({
          display: 'flex',
          width: '80%',
          margin: '20px auto 0',
          alignItems: 'center',
          justifyContent: 'center'
        })}
      >
        {this.props.children}
      </div>
    )
  }
}

export interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  active?: boolean
  disabled?: boolean
}

export class Button extends React.Component<ButtonProps> {
  render() {
    const { onClick, active, disabled, ...props } = this.props
    return (
      <button
        className={css({
          backgroundColor: '#333333',
          cursor: 'pointer',
          color: active ? '#469bff' : '#ffffff',
          textAlign: 'center',
          outline: 'none',
          height: '40px',
          border: 'none',
          minWidth: '60px',
          flex: 1,
          '&:hover': {
            backgroundColor: '#999999',
            color: active ? '#90c3ff' : '#666666'
          }
        })}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {this.props.children}
      </button>
    )
  }
}
