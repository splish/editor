import { editable } from '@splish-me/ory-editor-core/src/reducer/editable'
import PluginService from '@splish-me/ory-editor-core/src/service/plugin'
import * as R from 'ramda'
import * as React from 'react'

import { EditableProvider } from './contexts'

export interface RendererProps {
  state: any
  plugins: any[]
}

export const createRenderer = ({
  renderContainer = R.prop('children'),
  renderRow = R.prop('children'),
  renderCell = R.prop('children')
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
            return renderRow({
              row,
              children: row.cells.map((cell: any) => (
                <Cell key={cell.id} {...cell} />
              ))
            })
          })
        })
      }

      return null
    }
  }

  return class Renderer extends React.Component<RendererProps> {
    public render() {
      const { state, plugins } = this.props

      const service = new PluginService({ content: plugins })
      const props = editable(service.unserialize(state), {
        type: 'renderer/noop'
      })
      const cells = R.propOr([], 'cells', props)

      return (
        <EditableProvider
          value={({ id }) => {
            return <Renderer state={id.state} plugins={this.props.plugins} />
          }}
        >
          {renderContainer({
            cells,
            children: R.map(
              (cell: any) => <Cell key={cell.id} {...cell} />,
              cells
            )
          })}
        </EditableProvider>
      )
    }
  }
}

// TODO: renderEditable instead of <Editable /> so that we can DI another renderEditable for rendering
