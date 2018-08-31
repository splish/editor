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
import React, { Component } from 'react'
import { Resizable as ReactResizeable } from 'react-resizable'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { createStructuredSelector } from 'reselect'

import { resizeMode, editMode } from '../../../actions/display'
import { resizeStart, resizeStop } from '../../../actions/cell/resize'
import { computeStepWidth, widthToSize } from './helper.js'
import { shouldPureComponentUpdate } from '../../../helper/shouldComponentUpdate'

class Resizable extends Component {
  constructor(props) {
    super(props)

    const sw = computeStepWidth(props)
    this.state = {
      stepWidth: sw,
      width: props.node.size * sw,
      steps: props.steps - 1 || 11
    }
  }

  state

  shouldComponentUpdate = shouldPureComponentUpdate

  props

  onResize = (event, { size }) => {
    const newSize = widthToSize(this.state, this.props, size)
    if (!newSize) {
      console.warn('Expected resize event to yield a valid size, but got', {
        newSize,
        size,
        props: this.props,
        state: this.state
      })
      return
    }

    this.props.onChange(newSize)
    this.setState({ width: newSize * this.state.stepWidth })
  }

  render() {
    const {
      node: { bounds, inline },
      children,
      resizeStart,
      resizeStop
    } = this.props

    return (
      <ReactResizeable
        className={classNames('ory-cell-inner', 'ory-cell-resizable', {
          [`ory-cell-resizable-inline-${inline || ''}`]: inline
        })}
        onResizeStart={() => {
          resizeStart(this.props.id)
        }}
        onResizeStop={() => {
          resizeStop(this.props.id)
        }}
        onResize={this.onResize}
        minConstraints={inline ? null : [this.state.stepWidth, Infinity]}
        maxConstraints={
          inline ? null : [bounds.right * this.state.stepWidth, Infinity]
        }
        draggableOpts={{ axis: 'none', offsetParent: document.body }}
        width={this.state.width}
        height={0}
      >
        {/* this div needs to be kept or resize will be broken */}
        <div>{children}</div>
      </ReactResizeable>
    )
  }
}

const mapStateToProps = createStructuredSelector({})

const mapDispatchToProps = { resizeStart, resizeStop, editMode }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Resizable)
