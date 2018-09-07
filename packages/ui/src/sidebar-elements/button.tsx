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
          backgroundColor: active ? '#999999' : '#CCCCCC',
          cursor: 'pointer',
          color: active ? '#EEEEEE' : '#333333',
          outline: 'none',
          height: '30px',
          border: 'none',
          maxWidth: '80px',
          flex: 1,
          borderRight: '1px solid #999999',
          '&:first-child': {
            borderBottomLeftRadius: '5px',
            borderTopLeftRadius: '5px'
          },
          '&:last-child': {
            borderBottomRightRadius: '5px',
            borderTopRightRadius: '5px',
            border: 'none'
          },
          '&:hover': {
            backgroundColor: '#999999',
            color: '#CCCCCC'
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
