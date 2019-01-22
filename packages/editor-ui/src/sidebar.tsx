import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import styled from 'styled-components'

export interface SidebarProps {
  active?: boolean
  hideToggle?: boolean
}

export interface SidebarState {
  shown: boolean
}

const SidebarContainer = styled.div({
  position: 'fixed',
  left: 0,
  top: 0,
  height: '100%',
  width: '230px',
  backgroundColor: '#333333',
  fontFamily: 'Open Sans',
  fontSize: '10px',
  overflowY: 'auto'
})

const Toggle = styled.button<{ shown?: boolean }>(({ shown }) => {
  return {
    position: 'fixed',
    left: shown ? '230px' : 0,
    top: '20px',
    width: '35px',
    height: '64px',
    borderRadius: '10%',
    zIndex: 1000,
    backgroundColor: '#333333',
    '&:hover': {
      backgroundColor: '#888888',
      cursor: 'pointer'
    },
    '&:focus': {
      outline: 'none'
    }
  }
})

const Icon = styled(FontAwesomeIcon)({
  color: 'white'
})

// FIXME: doc: should only be rendered once
export class Sidebar extends React.Component<SidebarProps, SidebarState> {
  public state = { shown: true }

  public componentDidMount() {
    this.setGlobalStyle()
  }

  public componentWillUnmount() {
    const html = document.getElementsByTagName('html')[0]
    html.style.paddingLeft = null
  }

  public componentDidUpdate(prevProps: SidebarProps) {
    if (
      this.props.active !== prevProps.active ||
      this.props.hideToggle !== prevProps.hideToggle
    ) {
      this.setGlobalStyle()
    }
  }

  private setGlobalStyle() {
    const html = document.getElementsByTagName('html')[0]
    const active =
      this.props.active && (this.props.hideToggle || this.state.shown)

    html.style.paddingLeft = active ? '230px' : null
  }

  private toggleVisibility = () => {
    this.setState(({ shown }) => {
      return {
        shown: !shown
      }
    }, this.setGlobalStyle)
  }

  public render() {
    if (!this.props.active) {
      return null
    }

    const shown = this.props.hideToggle || this.state.shown

    return (
      <React.Fragment>
        {shown ? (
          <SidebarContainer className="ory-prevent-blur">
            {this.props.children}
          </SidebarContainer>
        ) : null}
        {this.props.hideToggle ? null : (
          <Toggle shown={shown} onClick={this.toggleVisibility}>
            <Icon
              fixedWidth
              icon={shown ? faAngleLeft : faAngleRight}
              size="lg"
            />
          </Toggle>
        )}
      </React.Fragment>
    )
  }
}
