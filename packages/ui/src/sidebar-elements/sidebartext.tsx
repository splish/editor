import { css } from 'emotion'
import * as React from 'react'

export default class Text extends React.Component {
  render() {
    return (
      <span
        className={css({
          marginTop: '20px',
          marginLeft: '10%',
          marginRight: '10%'
        })}
      >
        {this.props.children}
      </span>
    )
  }
}
