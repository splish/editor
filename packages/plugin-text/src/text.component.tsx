import * as React from 'react'
import { Editor } from 'slate-react'

import { ParagraphPlugin } from './plugins/paragraph'

export const plugins = [
  new ParagraphPlugin()
  // new EmphasizePlugin(),
  // new HeadingsPlugin({ DEFAULT_NODE }),
  // new LinkPlugin(),
  // new CodePlugin({ DEFAULT_NODE }),
  // new ListsPlugin({ DEFAULT_NODE }),
  // new BlockquotePlugin({ DEFAULT_NODE }),
  // new AlignmentPlugin()
  // new KatexPlugin({ DEFAULT_NODE })
]

export class Text extends React.Component {
  public render() {
    const { readOnly, state } = this.props
    const { value } = state

    return (
      <Editor
        onChange={this.handleChange}
        // onKeyDown={onKeyDown}
        readOnly={Boolean(readOnly)}
        // className="ory-plugins-content-slate-container"
        // onBlur={onBlur}
        value={value}
        plugins={plugins}
        // onPaste={this.onPaste}
        // placeholder={placeholder}
      />
    )
    // const { focused, state } = this.props
    // const { value } = state

    // if (this.props.focused) {
    //   return <ReactQuill.default value={value} onChange={this.handleChange} />
    // }

    // console.log(JSON.stringify(value, null, 2))

    // return value.map(op => {
    //   const { attributes, insert } = op

    //   let node = insert

    //   if (attributes) {
    //     if (attributes.bold) {
    //       node = <strong>{node}</strong>
    //     }

    //     if (attributes.italic) {
    //       node = <em>{node}</em>
    //     }

    //     if (attributes.link) {
    //       node = <a href={attributes.link}>{node}</a>
    //     }

    //     if (attributes.list) {
    //       node = <li>{node}</li>
    //     }
    //   }

    //   return node
    // })
  }

  private handleChange = ({ value }) => {
    this.props.onChange({ value })
  }
}
