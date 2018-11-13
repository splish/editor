import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { actions, selectors } from '@splish-me/ory-editor-core'
import * as React from 'react'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

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

const mapStateToProps = (state: any) => {
  const { focus, searchNodeEverywhere } = selectors({
    getState() {
      return state
    }
  })
  const id = focus()
  const node = searchNodeEverywhere(id)

  return {
    cell: node ? node.node : undefined
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    removeCell: actions(dispatch).cell.remove
  }
}

export const PluginSidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedPluginSidebar)
