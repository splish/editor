import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// @ts-ignore
import { removeCell } from '@splish-me/ory-editor-core/lib/actions/cell'
// @ts-ignore
import { searchNodeEverywhere } from '@splish-me/ory-editor-core/lib/selector/editable'
// @ts-ignore
import { focus } from '@splish-me/ory-editor-core/lib/selector/focus'
import * as R from 'ramda'
import * as React from 'react'
import { createPortal } from 'react-dom'
import { connect } from 'react-redux'
import { Action, Dispatch, bindActionCreators } from 'redux'

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
  const id = focus(state)
  const node = searchNodeEverywhere(state, id)

  return {
    cell: node ? R.prop('node', node) : undefined
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      removeCell
    },
    dispatch
  )

export const PluginSidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedPluginSidebar)
