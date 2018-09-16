import { css } from 'emotion'
import * as React from 'react'

export interface SidebarTextareaProps {
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  label?: string
  placeholder?: string
}
export default class SidebarTextarea extends React.Component<
  SidebarTextareaProps
> {
  private textarea = React.createRef<HTMLTextAreaElement>()

  public focus() {
    const textarea = this.textarea.current

    if (textarea) {
      setTimeout(() => {
        textarea.blur()
        textarea.focus()
      })
    }
  }

  public render() {
    const { value, label, placeholder, onChange } = this.props
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
          onChange={onChange}
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
          ref={this.textarea}
        />
      </label>
    )
  }
}
