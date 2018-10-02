import {
  faPen,
  faArrowsAlt,
  faPlus,
  faExpandArrowsAlt,
  faLaptop
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EditorConsumer } from '@splish-me/editor-core/contexts'
import { css, injectGlobal } from 'emotion'
import * as R from 'ramda'
import * as React from 'react'
import { connect } from 'react-redux'

import { styled } from './styled'

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
  ({ active }) => {
    if (active) {
      return {
        backgroundColor: '#18E3B3'
      }
    }
  }
)

class RawModeToolbar extends React.Component {
  public render() {
    return (
      <EditorConsumer>
        {({ currentMode, changeMode }) => {
          return (
            <div
              className={css({
                position: 'fixed',
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '46px',
                marginRight: '50px',
                zIndex: '10000'
              })}
            >
              {R.map(mode => {
                return (
                  <ModeButton
                    key={mode.mode}
                    active={currentMode === mode.mode}
                    onClick={() => {
                      changeMode(mode.mode)
                    }}
                  >
                    <FontAwesomeIcon
                      fixedWidth
                      className={css({
                        color: 'white'
                      })}
                      icon={mode.icon}
                      size="lg"
                    />
                  </ModeButton>
                )
              }, modes)}
            </div>
          )
        }}
      </EditorConsumer>
    )
  }
}

export const ModeToolbar = connect(state => {
  const mode = state.display.mode
  return {
    mode: mode === 'resizing' ? 'resize' : mode
  }
})(RawModeToolbar)
