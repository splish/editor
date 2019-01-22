import { faPen, faArrowsAlt, faLaptop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EditorContext } from '@splish-me/editor'
import { RootState } from 'ory-editor-core/lib/types/state'
import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const modes = [
  {
    mode: 'edit',
    children: 'Edit',
    icon: faPen
  },
  {
    mode: 'layout',
    children: 'Layout',
    icon: faArrowsAlt
  },
  {
    mode: 'preview',
    children: 'Preview',
    icon: faLaptop
  }
]

const ModeButton = styled('button')(
  {
    marginTop: '16px',
    height: '64px',
    width: '64px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#333333',
    focus: 'outline',
    '&:hover': {
      backgroundColor: '#888888',
      cursor: 'pointer'
    },
    '&:focus': {
      outline: 'none'
    }
  },
  ({ active }: { active?: boolean }) => {
    if (active) {
      return {
        backgroundColor: '#18E3B3'
      }
    }

    return {}
  }
)

const ModeToolbarContainer = styled.div({
  position: 'fixed',
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '46px',
  marginRight: '50px',
  zIndex: 10000
})

const Icon = styled(FontAwesomeIcon)({
  color: 'white'
})

export const ModeToolbar = connect((state: RootState) => {
  const mode = state.ory.display.mode

  return {
    mode: mode === 'resizing' ? 'resize' : mode
  }
})(
  class ModeToolbar extends React.Component {
    public render() {
      return (
        <EditorContext.Consumer>
          {props => {
            if (!props) {
              return null
            }

            const { currentMode, changeMode } = props

            return (
              <ModeToolbarContainer>
                {modes.map(mode => {
                  return (
                    <ModeButton
                      key={mode.mode}
                      active={currentMode === mode.mode}
                      onClick={() => {
                        changeMode(mode.mode)
                      }}
                    >
                      <Icon fixedWidth icon={mode.icon} size="lg" />
                    </ModeButton>
                  )
                }, modes)}
              </ModeToolbarContainer>
            )
          }}
        </EditorContext.Consumer>
      )
    }
  }
)
