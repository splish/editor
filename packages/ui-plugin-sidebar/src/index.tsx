import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { searchNodeEverywhere } from 'ory-editor-core/lib/selector/editable'
import { RootState } from 'ory-editor-core/lib/types/state'
import * as React from 'react'
import { createPortal } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {removeCell} from 'ory-editor-core/lib/actions/cell'

export * from './button'
export * from './checkbox'
export * from './dropdown'
export * from './input'
export * from './text'
export * from './textarea'

let sidebarNode = React.createRef<HTMLDivElement>()

export const renderIntoSidebar = (children: React.ReactNode) => {
  if (!sidebarNode.current) {
    return null
  }

  // FIXME: pass props etc. here, so that we can display the plugin's name and remove the cell
  return createPortal(children, sidebarNode.current)
}

export interface PluginSidebarProps {
  cell: any | null
  removeCell: (id: string) => void
}

class UnconnectedPluginSidebar extends React.Component<PluginSidebarProps> {
  public render() {
    const { cell, removeCell } = this.props

    return (
      <React.Fragment>
        {cell ? (
          <React.Fragment>
            {cell.content.plugin.text}

            <button onClick={() => removeCell(cell.id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </React.Fragment>
        ) : null}
        <div ref={sidebarNode} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const id = state.ory.focus
  const node = searchNodeEverywhere(state, id)

  return {
    cell: node ? node.node : undefined
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  removeCell
}, dispatch)

export const PluginSidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedPluginSidebar)
