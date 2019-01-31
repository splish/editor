import * as React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const OverlayBox = styled.div({
  width: '100%',
  position: 'absolute',
  right: '0',
  zIndex: '1',
  backgroundColor: 'rgb(51,51,51,0.95) ',
  paddingBottom: '10px'
})
const SettingButton = styled.button({
  float: 'right',
  position: 'relative',
  zIndex: '2',
  outline: 'none',
  border: 'none',
  backgroundColor: 'transparent',
  paddingTop: '5px'
})

export class SettingOverlay extends React.Component<
  SettingOverlayProps,
  { showOverlay: boolean }
> {
  constructor(props: SettingOverlayProps) {
    super(props)
    this.state = { showOverlay: false }
  }
  render() {
    const { readOnly } = this.props
    return readOnly ? null : (
      <React.Fragment>
        <SettingButton
          onClick={() =>
            this.setState({ showOverlay: !this.state.showOverlay })
          }
        >
          <FontAwesomeIcon fixedWidth icon={faCog} />
        </SettingButton>
        {this.state.showOverlay ? (
          <OverlayBox>{this.props.children}</OverlayBox>
        ) : null}
      </React.Fragment>
    )
  }
}

export interface SettingOverlayProps {
  readOnly: boolean
}
