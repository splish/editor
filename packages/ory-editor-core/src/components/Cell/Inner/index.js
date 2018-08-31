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
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { shouldPureComponentUpdate } from '../../../helper/shouldComponentUpdate'
import Droppable from '../Droppable'
import Draggable from '../Draggable'
import Rows from '../Rows'
import Layout from '../Layout'
import Content from '../Content'
import Empty from '../Empty'

import { resizingCell } from '../../../selector/resize'

class Inner extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  props

  render() {
    const {
      resizingCell,
      node: {
        rows = [],
        layout: {
          plugin: {
            Component: LayoutComponent,
            name: layoutType,
            text: layoutTitle
          } = {}
        } = {},
        content: {
          plugin: {
            Component: ContentComponent,
            name: contentType,
            text: contentTitle
          } = {}
        } = {}
      },
      config: { whitelist = [] }
    } = this.props
    // const className = 'ory-cell-inner'

    if (rows.length && LayoutComponent) {
      return (
        <Droppable {...this.props} dropTypes={whitelist}>
          <Draggable
            {...this.props}
            dragType={layoutType}
            name={layoutTitle || layoutType}
          >
            <Layout {...this.props} />
          </Draggable>
        </Droppable>
      )
    } else if (rows.length) {
      return (
        <Droppable {...this.props} dropTypes={whitelist}>
          <Rows {...this.props} />
        </Droppable>
      )
    } else if (ContentComponent) {
      return (
        <Droppable {...this.props} isLeaf dropTypes={whitelist}>
          <Draggable
            {...this.props}
            isLeaf
            dragType={contentType}
            name={contentTitle || contentType}
          >
            <Content {...this.props} />
          </Draggable>
        </Droppable>
      )
    }

    return <Empty {...this.props} />
  }
}

const mapStateToProps = createStructuredSelector({
  resizingCell
})

export default connect(mapStateToProps)(Inner)
