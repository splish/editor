import * as React from 'react'
import styled from 'styled-components'

const CheckboxLabel = styled.label({
  color: 'white',
  // width: '30%',
  // marginLeft: '10%',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '20px'
})

const CheckboxToggleContainer = styled.div<{ value?: boolean }>(({ value }) => {
  return {
    cursor: 'pointer',
    border: '2px solid #CCCCCC',
    borderRadius: '15%',
    width: '10px',
    height: '10px',
    marginLeft: '10px',
    display: 'inline-block',

    '&:after': {
      opacity: value ? 1 : 0,
      backgroundColor: '#CCCCCC',
      content: '',
      position: 'absolute',
      width: '10px',
      height: '10px'
    }
  }
})

const CheckboxToggle = styled.div<{ value?: boolean }>(({ value }) => {
  return {
    opacity: value ? 1 : 0,
    content: '',
    position: 'absolute',
    width: '8px',
    height: '5px',
    border: '2px solid #333333',
    borderTop: 'none',
    borderRight: 'none',

    transform: 'rotate(-45deg)',
    zIndex: 1000
  }
})

export class Checkbox extends React.Component<CheckboxProps> {
  public render() {
    const { value, onChange, label } = this.props
    return (
      <CheckboxLabel>
        {label}
        <CheckboxToggleContainer
          onClick={() => {
            // @ts-ignore FIXME: this should be simpler ;)
            onChange({ target: { checked: !value } })
          }}
          value={value}
        >
          <CheckboxToggle value={value} />
          />
        </CheckboxToggleContainer>
      </CheckboxLabel>
    )
  }
}

export interface CheckboxProps {
  value?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
}
