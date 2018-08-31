import { css } from 'emotion'
import * as React from 'react'

export interface CheckboxProps {
  value?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
}
export default class SidebarCheckbox extends React.Component<CheckboxProps> {
  public render() {
    const { value, onChange, label, ...props } = this.props
    return (
      <label
        className={css({
          color: 'white',
          // width: '30%',
          // marginLeft: '10%',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20px'
        })}
      >
        {label}
        <div
          className={css({
            cursor: 'pointer',
            border: '2px solid #CCCCCC',
            borderRadius: '15%',
            width: '10px',
            height: '10px',
            marginLeft: '10px',
            display: 'inline-block',

            '&:after': {
              opacity: `${value ? 1 : 0}`,
              backgroundColor: '#CCCCCC',
              content: `''`,
              position: 'absolute',
              width: '10px',
              height: '10px'
            }
          })}
        >
          <div
            className={css({
              opacity: `${value ? 1 : 0}`,
              content: `''`,
              position: 'absolute',
              width: '8px',
              height: '5px',
              border: '2px solid #333333',
              borderTop: 'none',
              borderRight: 'none',

              transform: `rotate(-45deg)`,
              zIndex: '1000'
            })}
          />
        </div>

        <input
          type="checkbox"
          checked={value}
          onChange={onChange}
          className={css({
            visibility: 'hidden'
          })}
          {...props}
        />
      </label>
    )
  }
}
