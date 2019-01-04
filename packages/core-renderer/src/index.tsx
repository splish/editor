import { DocumentContext } from '@splish-me/editor-core-contexts'
import { DocumentProps, SerializedDocument } from '@splish-me/editor-core-types'
import { editableReducer, PluginService } from '@splish-me/ory-editor-core'
import * as React from 'react'

export interface RendererProps {
  state: any
  plugins: any[]
}

export const createRenderer = ({
  renderContainer,
  renderRow,
  renderCell
}: {
  renderContainer: (
    args: { cells: any; children: React.ReactNode }
  ) => React.ReactNode
  renderRow: (args: { row: any; children: React.ReactNode }) => React.ReactNode
  renderCell: (
    args: { cell: any; children: React.ReactNode }
  ) => React.ReactNode
}): React.ComponentType<RendererProps> => {
  interface CellProps {
    rows: any[]
    content?: any
    size: number
  }

  class Cell extends React.Component<CellProps> {
    static defaultProps = {
      rows: [],
      content: {}
    }

    render() {
      const { rows, content } = this.props

      if (content.plugin) {
        const {
          state,
          plugin: { Component, StaticComponent }
        } = content
        const Renderer = StaticComponent || Component

        return renderCell({
          cell: this.props,
          children: (
            <Renderer
              isPreviewMode
              readOnly
              state={state}
              onChange={() => {}}
            />
          )
        })
      } else if (rows.length > 0) {
        return renderCell({
          cell: this.props,
          children: rows.map(row => {
            return (
              <React.Fragment key={row.id}>
                {renderRow({
                  row,
                  children: row.cells.map((cell: any) => (
                    <Cell key={cell.id} {...cell} />
                  ))
                })}
              </React.Fragment>
            )
          })
        })
      }

      return null
    }
  }

  return class Renderer extends React.Component<RendererProps> {
    public render() {
      const { state, plugins } = this.props

      const service: any = new PluginService({ content: plugins })
      const props = editableReducer(service.unserialize(state), {
        type: 'renderer/noop'
      })
      const cells: unknown[] = props.cells || []

      return (
        <DocumentContext.Provider
          value={({ state }: DocumentProps) => {
            const doc = state as SerializedDocument

            if (doc.state) {
              return <Renderer state={doc.state} plugins={this.props.plugins} />
            }

            throw new Error(
              'Got `DocumentIdentifier` instead of a `SerializedDocument`'
            )
          }}
        >
          {renderContainer({
            cells,
            children: cells.map((cell: any) => <Cell key={cell.id} {...cell} />)
          })}
        </DocumentContext.Provider>
      )
    }
  }
}
