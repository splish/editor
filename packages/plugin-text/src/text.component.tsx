import * as React from 'react'
import * as ReactQuill from 'react-quill'

import 'react-quill/dist/quill.snow.css'

export class Text extends React.Component {
  public render() {
    console.log('text state', this.props.state.value)

    return (
      <ReactQuill.default
        value={this.props.state.value}
        onChange={this.handleChange}
      />
    )
  }

  private handleChange = (_value, _delta, _source, editor) => {
    this.props.onChange({ value: editor.getContents() })
  }
}
