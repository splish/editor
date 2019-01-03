import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import * as React from 'react'
import styled from 'styled-components'

const DropdownLabel = styled.label({
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  margin: '20px auto 0px',
  padding: '0 10%',
  alignItems: 'stretch'
})

// @ts-ignore FIXME: backgroundImage is the problem
const DropdownSelect = styled.select({
  marginTop: '5px',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  backgroundImage: faAngleDown,
  backgroundPosition: 'right',
  backgroundRepeat: 'no-repeat',
  border: 'none',
  outline: 'none',
  appearance: 'none',

  borderRadius: '5px',
  padding: '2px 10px',
  color: '#333333',
  '&:focus': {
    border: '2px solid #469BFF'
  }
})

const DropdownOption = styled.option({
  backgroundColor: '#CCCCCC',

  '&:last-child': { borderRadius: '5px' }
})

export class Dropdown extends React.Component<DropdownProps> {
  render() {
    const { options, onChange, label, value, ...props } = this.props
    return (
      <DropdownLabel>
        <span>{label}</span>
        <DropdownSelect value={value} onChange={onChange} {...props}>
          {options.map((element: string, index: number) => {
            return (
              <DropdownOption value={element} key={index}>
                {element}
              </DropdownOption>
            )
          })}
        </DropdownSelect>
      </DropdownLabel>
    )
  }
}

export interface DropdownProps {
  options?: any
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
  label?: string
  value: string
}
