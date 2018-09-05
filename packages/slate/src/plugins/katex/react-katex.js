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
import React from 'react'
import PropTypes from 'prop-types'
import KaTeX from 'katex'

const createMathComponent = (Component, { displayMode }) => {
  class MathComponent extends React.Component {
    constructor(props) {
      super(props)

      this.usedProp = props.math ? 'math' : 'children'

      this.state = this.createNewState(null, props)
    }

    componentWillReceiveProps() {
      this.setState(this.createNewState)
    }

    shouldComponentUpdate(nextProps) {
      return nextProps[this.usedProp] !== this.props[this.usedProp]
    }

    createNewState(prevState, props) {
      try {
        const html = this.generateHtml(props)

        return { html, error: undefined }
      } catch (error) {
        if (error instanceof KaTeX.ParseError || error instanceof TypeError) {
          return { error }
        }

        throw error
      }
    }

    generateHtml(props) {
      const { errorColor, renderError } = props

      return KaTeX.renderToString(props[this.usedProp], {
        displayMode,
        errorColor,
        throwOnError: !!renderError
      })
    }

    render() {
      const { error, html } = this.state
      const { renderError } = this.props

      if (error) {
        return renderError ? (
          renderError(error)
        ) : (
          <Component html={`${error.message}`} />
        )
      }

      return <Component html={html} />
    }
  }

  MathComponent.propTypes = {
    children: PropTypes.string,
    errorColor: PropTypes.string,
    math: PropTypes.string,
    renderError: PropTypes.func
  }

  return MathComponent
}

const IBlockMath = ({ html }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export const BlockMath = createMathComponent(IBlockMath, { displayMode: true })

const IInlineMath = ({ html }) => {
  return <span dangerouslySetInnerHTML={{ __html: html }} />
}

export const InlineMath = createMathComponent(IInlineMath, {
  displayMode: false
})
