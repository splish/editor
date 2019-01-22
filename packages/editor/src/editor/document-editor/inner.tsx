import { createFallbackCell } from 'ory-editor-core/lib/actions/cell'
import withDimensions from 'ory-editor-core/lib/components/Dimensions'
import { purifiedEditable } from 'ory-editor-core/lib/selector/editable'
import { ContentPlugin } from 'ory-editor-core/lib/service/plugin/classes'
import * as React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { Cell } from './cell'

const mapStateToProps = createStructuredSelector({ node: purifiedEditable })

const mapDispatchToProps = { createFallbackCell }

export const DocumentInner = withDimensions()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class DocumentInner extends React.PureComponent<
      {
        createFallbackCell: (plugin: unknown, id: string) => void
      } & {
        containerWidth: number
        containerHeight: number
      } & {
        node: {
          cells: unknown[]
        }
      } & DocumentInnerProps
    > {
      public componentDidMount() {
        this.createFallbackCell()
      }

      public componentDidUpdate() {
        this.createFallbackCell()
      }

      public render() {
        const { id, containerWidth, containerHeight, node } = this.props

        if (!node) {
          return null
        }

        const { cells = [] } = node
        return (
          <div className="ory-editable ory-prevent-blur">
            {cells.map((c: string) => (
              <Cell
                rowWidth={containerWidth}
                rowHeight={containerHeight}
                editable={id}
                ancestors={[]}
                key={c}
                id={c}
              />
            ))}
          </div>
        )
      }

      private createFallbackCell() {
        const { node, defaultPlugin, id } = this.props

        if (!node) {
          return
        }

        const { cells = [] } = node
        if (cells.length === 0) {
          this.props.createFallbackCell(
            new ContentPlugin(defaultPlugin as any),
            id
          )
        }
      }
    }
  )
)

export interface DocumentInnerProps {
  id: string
  defaultPlugin: unknown
}
