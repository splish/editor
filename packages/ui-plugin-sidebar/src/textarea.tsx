import * as React from 'react'
import styled from 'styled-components'

const TextareaLabel = styled.label({
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  margin: '20px auto 0px',
  padding: '0 10%',
  alignItems: 'stretch'
})

const TextareaInner = styled.textarea({
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
})

export class Textarea extends React.Component<TextareaProps> {
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
      <TextareaLabel>
        <span>{label}</span>
        <TextareaInner
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          ref={this.textarea}
        />
      </TextareaLabel>
    )
  }
}

export interface TextareaProps {
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  label?: string
  placeholder?: string
}
