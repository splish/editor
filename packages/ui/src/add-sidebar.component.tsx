import { EditorConsumer } from '@splish-me/editor-core/lib/contexts'
import { css } from 'emotion'
import * as R from 'ramda'
import * as React from 'react'
// @ts-ignore
import { DragSource as dragSource } from 'react-dnd'
import classNames from 'classnames'

import { styled } from './styled'

class Draggable extends React.Component<any> {
  componentDidMount() {
    const img = new Image()
    img.onload = () => this.props.connectDragPreview(img)
    img.src =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAA6UlEQVRYhe2ZQQ6CMBBFX0njHg7ESXTp1p3uvIBewc3Em3AfdelSFwRDCAm01JRO+pa0lP8zzc9kMCKyAa7AFqhIixdwB44WuACHuHq8KWm1vwtgF1lMCPaWkevUNE3Qr9R17XTu1P5uvUdV+IpbG2qMGBH5xBYRAjUVUWPEjj10SS3XRFry3kha/VBTETVGcmqtDTVGFqdWn7k9ku96f88QNRVRYySn1tpQY8QptXz7qinmnpt7rZTIqbU21BgJ2mv1+XfCDVFTETVGjIg8SG8KP+RZ0I7lU+dmgRNgaKfyZVw9znT/R85fOHJJE77U6UcAAAAASUVORK5CYII='
  }

  render() {
    const { connectDragSource, isDragging, children, className } = this.props
    const classes = classNames(
      className,
      { 'ory-toolbar-draggable-is-dragged': isDragging },
      'ory-toolbar-draggable'
    )

    return connectDragSource(<div className={classes}>{children}</div>)
  }
}

const source = {
  beginDrag({ createNode, ...props }: any) {
    const node = createNode()
    return {
      node,
      rawNode: () => node,
      ...props
    }
  },

  endDrag(_props: any, monitor: any) {
    const item = monitor.getItem()

    item.clearHover()
  }
}

const collect = (connect: any, monitor: any) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview()
})

const dragInstances: any = {}

const mapDragTypeToInstance = (dragType = 'CELL') => {
  if (!dragInstances[dragType]) {
    dragInstances[dragType] = dragSource(dragType, source, collect)(Draggable)
  }

  return dragInstances[dragType]
}
const PluginButton = styled('button')({
  width: '80%',
  height: '64px',
  margin: '15px 10% 0px 10%',
  backgroundColor: '#444444',
  fontSize: '18px',
  textAlign: 'center',
  color: 'white',
  border: 'none',
  '&:hover': {
    backgroundColor: '#888888',
    cursor: 'grab'
  },
  '&:focus': {
    outline: 'none'
  }
})

export class AddSidebar extends React.Component {
  public render() {
    return (
      <EditorConsumer>
        {(props) => {
          if (!props) {
            return null
          }

          const { editor } = props

          const plugins = editor.plugins.plugins.content
          return (
            <React.Fragment>
              {R.map(plugin => {
                if (plugin.name === 'ory/editor/core/default') {
                  return null
                }

                const DraggableC = mapDragTypeToInstance(plugin.name)

                return (
                  <DraggableC
                    key={plugin.name}
                    createNode={() => {
                      return {
                        content: {
                          plugin,
                          state: plugin.createInitialState()
                        }
                      }
                    }}
                    layoutMode={editor.trigger.mode.layout}
                    insertMode={editor.trigger.mode.edit}
                    clearHover={editor.trigger.cell.clearHover}
                  >
                    <PluginButton key={plugin.name}>
                      <div className={css({ float: 'left' })}>
                        {plugin.IconComponent}
                      </div>
                      {plugin.text}
                    </PluginButton>
                  </DraggableC>
                )
              }, plugins)}
            </React.Fragment>
          )
        }}
      </EditorConsumer>
    )
  }
}
