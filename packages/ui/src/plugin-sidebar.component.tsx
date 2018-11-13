import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { removeCell } from '@splish-me/ory-editor-core/actions/cell'
import { searchNodeEverywhere } from '@splish-me/ory-editor-core/selector/editable'
import { focus } from '@splish-me/ory-editor-core/selector/focus'
import * as R from 'ramda'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

let sidebarNode: Element | null = null

export const renderIntoSidebar = (children: React.ReactNode) => {
  if (!sidebarNode) {
    return null
  }

  // FIXME: pass props etc. here, so that we can display the plugin's name and remove the cell
  return <div> {children} </div>
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
        <div
          ref={ref => {
            sidebarNode = ref
          }}
        />
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

const mapDispatchToProps = dispatch =>
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
