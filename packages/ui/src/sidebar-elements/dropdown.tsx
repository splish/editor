import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { css } from 'emotion'
import * as React from 'react'
import Select from 'react-select'

export interface DropDownProps {
  options?: any
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
  label?: string
  value: string
}

export default class SidebarDropDown extends React.Component<DropDownProps> {
  render() {
    const { options, onChange, label, value } = this.props
    return (
      <Select
        value={value}
        onChange={onChange}
        options={options}
        placeholder={label}
      >
        {console.log('in select:', value)}
      </Select>
      // <select
      //   className={css({
      //     marginTop: '5px',
      //     WebkitAppearance: 'none',
      //     MozAppearance: 'none',
      //     appearance: 'none',
      //     backgroundImage: faAngleDown,
      //     backgroundPosition: 'right',
      //     backgroundRepeat: 'no-repeat',
      //     border: 'none',
      //     outline: 'none',
      //     borderRadius: '5px',
      //     padding: '2px 10px',
      //     color: '#333333',
      //     '&:focus': {
      //       border: '2px solid #469BFF'
      //     }
      //   })}
      //   value={value}
      //   onChange={onChange}
      //   {...props}
      // >
      //   {options.map((element: string, index: number) => {
      //     return (
      //       <option
      //         value={element}
      //         key={index}
      //         className={css({
      //           backgroundColor: '#CCCCCC',

      //           '&:last-child': { borderRadius: '5px' }
      //         })}
      //       >
      //         {element}
      //       </option>
      //     )
      //   })}
      // </select>
    )
  }
}
