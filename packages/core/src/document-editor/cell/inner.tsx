import Draggable from 'ory-editor-core/lib/components/Cell/Draggable'
import Droppable from 'ory-editor-core/lib/components/Cell/Droppable'
import Content from 'ory-editor-core/lib/components/Cell/Content'
import Empty from 'ory-editor-core/lib/components/Cell/Empty'
import Rows from 'ory-editor-core/lib/components/Cell/Rows'
import { ComponetizedCell } from 'ory-editor-core/lib/types/editable'
import * as React from 'react'

export class CellInner extends React.PureComponent<ComponetizedCell> {
  render() {
    const {
      node: {
        rows = [],
        content: {
          plugin: {
            Component: ContentComponent = undefined,
            name: contentType = undefined,
            text: contentTitle = undefined
          } = {}
        } = {}
      },
      config: { whitelist = [] }
    } = this.props

    if (rows.length) {
      return (
        <Droppable {...this.props} dropTypes={whitelist}>
          <Rows {...this.props} />
        </Droppable>
      )
    } else if (ContentComponent) {
      return (
        <Droppable {...this.props} isLeaf={true} dropTypes={whitelist}>
          <Draggable
            {...this.props}
            isLeaf={true}
            dragType={contentType}
            name={contentTitle || contentType}
          >
            <Content {...this.props} />
          </Draggable>
        </Droppable>
      )
    }

    return <Empty {...this.props} />
  }
}
