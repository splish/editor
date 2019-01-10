import * as React from 'react'
import styled from 'styled-components'

export const ButtonGroup = styled.div({
  display: 'flex',
  width: '80%',
  margin: '20px auto 0',
  alignItems: 'center',
  justifyContent: 'center'
})

export const Button = styled.button<{ active?: boolean }>(({ active }) => {
  return {
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
      color: '#90c3ff'
    }
  }
})
