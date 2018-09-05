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
import { InlineMath, BlockMath } from './react-katex'

const handleError = (formula, error, inline, oldErrorPosition) => {
  const errorStyle = {
    color: '#CC0000'
  }

  if (error.position === oldErrorPosition) {
    return <span style={errorStyle}>{formula}</span>
  }

  const beforeError = formula.substring(0, error.position)
  const afterError = formula.substring(error.position)
  return (
    <span
      style={{
        display: 'inline-block'
      }}
    >
      <MathComponent
        formula={beforeError}
        inline={inline}
        oldErrorPosition={error.position}
      />
      <span style={errorStyle}>{afterError}</span>
      <div style={errorStyle}>
        <b>
          {error.name}: {error.message}
        </b>
      </div>
    </span>
  )
}

const MathComponent = ({ inline, formula, oldErrorPosition }) => {
  // hack... empty string doesn't work. FIXME
  if (!formula) {
    return null
  }

  const Component = inline ? InlineMath : BlockMath
  return (
    <Component
      math={formula}
      renderError={error =>
        handleError(formula, error, inline, oldErrorPosition)
      }
    />
  )
}

export default MathComponent
