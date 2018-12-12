import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { css } from 'emotion'
import * as React from 'react'

export interface DropDownProps {
  options?: any
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
  label?: string
  value: string
}

export default class SidebarDropDown extends React.Component<DropDownProps> {
  render() {
    const { options, onChange, label, value, ...props } = this.props
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
        <select
          // @ts-ignore FIXME: backgroundImage is the problem
          className={css({
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
          })}
          value={value}
          onChange={onChange}
          {...props}
        >
          {options.map((element: string, index: number) => {
            return (
              <option
                value={element}
                key={index}
                className={css({
                  backgroundColor: '#CCCCCC',

                  '&:last-child': { borderRadius: '5px' }
                })}
              >
                {element}
              </option>
            )
          })}
        </select>
      </label>
    )
  }
}
