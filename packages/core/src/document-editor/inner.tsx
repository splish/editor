import * as React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Cell from 'ory-editor-core/lib/components/Cell'
import {
  blurAllCells,
  createFallbackCell
} from 'ory-editor-core/lib/actions/cell'
import {
  enableGlobalBlurring,
  disableGlobalBlurring
} from 'ory-editor-core/lib/components/Editable/Inner/blur'
import withDimensions from 'ory-editor-core/lib/components/Dimensions'
import { purifiedEditable } from 'ory-editor-core/lib/selector/editable'
import { ContentPlugin } from 'ory-editor-core/lib/service/plugin/classes'

const mapStateToProps = createStructuredSelector({ node: purifiedEditable })

const mapDispatchToProps = { blurAllCells, createFallbackCell }

export const DocumentInner = withDimensions()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class DocumentInner extends React.PureComponent<
      {
        blurAllCells: (e: Event) => void
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
      componentDidMount() {
        enableGlobalBlurring(this.props.blurAllCells)
        this.createFallbackCell()
      }

      componentDidUpdate() {
        this.createFallbackCell()
      }

      componentWillUnmount() {
        disableGlobalBlurring(this.props.blurAllCells)
      }

      createFallbackCell = () => {
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

      render() {
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
    }
  )
)

export interface DocumentInnerProps {
  id: string
  defaultPlugin: unknown
}
