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
import MathComponent from './math-component'
import Form from './form'
const Katex = props => {
  const { attributes, children, node } = props
  const { data } = node
  const formula = data.get('formula')
  const inline = data.get('inline')
  return (
    <span className={inline ? 'katex' : 'katex-inline'} {...attributes}>
      <MathComponent formula={formula} inline={inline} />
      <Form formula={formula} inline={inline} {...props} />
      {children}
    </span>
  )
}
export default Katex
