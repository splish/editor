/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0-or-later
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 * @copyright 2018 Splish UG (haftungsbeschränkt)
 * @author Splish UG (haftungsbeschränkt)
 */
import { css } from 'emotion'
import * as React from 'react'
// @ts-ignore
import { Resizable } from 'react-resizable'
import { renderIntoSidebar } from '@splish-me/editor-ui/lib/plugin-sidebar.component'
import Textfield from '@splish-me/editor-ui/lib/sidebar-elements/textfield'

const faintBlack = 'rgba(0, 0, 0, 0.12)'

const compute = ({ height }: { height: number }) => ({
  height: height > 24 ? height : 24
})

const fire = ({
  state,
  onChange
}: {
  state: Object
  onChange(state: Object): void
}) => onChange(state)

const Solid = ({ height }: { height: number }) => <div style={{ height }} />

const handleChange = (onChange: SpacerProps['onChange']) => (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const target = e.target
  if (target instanceof HTMLInputElement) {
    onChange({ height: parseInt(target.value) })
    return
  }
}

interface SpacerState {
  height: number
}

interface SpacerProps {
  onChange: (state: Partial<SpacerState>) => void
  focused?: boolean
  readOnly?: boolean
  isPreviewMode?: boolean
  state: SpacerState
}

export class Spacer extends React.Component<SpacerProps> {
  state = {}

  onResize = (
    _event: Event,
    { size }: { size: { height: number; width: number } }
  ) => {
    const { onChange } = this.props
    const state = compute(size)
    fire({ onChange, state })
  }

  render() {
    const { readOnly, isPreviewMode, focused, onChange } = this.props
    const height = this.props.state.height > 0 ? this.props.state.height : 1

    return (
      <div
        style={{ border: 'solid 1px', borderColor: faintBlack }}
        className={css({
          border: '1px dashed #000',
          borderBottom: 'none',
          position: 'relative',
          borderColor: isPreviewMode ? 'transparent !important' : undefined,
          '& > .react-resizable > .react-resizable-handle:before, & > .react-resizable > .react-resizable-handle:hover:before': {
            content: ' ',
            position: 'absolute',
            textAlign: 'center',
            width: '100%',
            bottom: 0,
            right: 0,
            cursor: 'n-resize',
            lineHeight: '12px',
            fontSize: '1.5em',
            height: '24px'
          }
        })}
      >
        {readOnly ? (
          <Solid height={height} />
        ) : (
          <Resizable onResize={this.onResize} height={height} width={0}>
            <div style={{ height, position: 'relative' }}>
              {focused
                ? renderIntoSidebar(
                    <Textfield
                      label="Element height (px)"
                      placeholder="24"
                      onChange={handleChange(onChange)}
                      value={height.toString()}
                    />
                  )
                : null}
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  height: '24px',
                  width: '100%',
                  background: faintBlack,
                  textAlign: 'center'
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{ color: 'white', width: 24, height: 24 }}
                >
                  <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z" />
                </svg>
              </div>
            </div>
          </Resizable>
        )}
      </div>
    )
  }
}

export default Spacer
