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
import { faImages } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from 'emotion'
import * as React from 'react'

const Display = ({
  isEditMode,
  state
}: {
  isEditMode: unknown
  state: unknown
}) => {
  const Image = (
    <img
      className={css({
        width: '100%'
      })}
      src={state.src}
    />
  )
  return state.src ? (
    <div>
      {state.href && !isEditMode ? (
        <a href={state.href} target={state.target} rel={state.rel}>
          {Image}
        </a>
      ) : (
        Image
      )}
    </div>
  ) : (
    <div>
      <div
        className={css({
          position: 'relative',
          width: '100%',
          textAlign: 'center'
        })}
      >
        <FontAwesomeIcon icon={faImages} size="lg" />
      </div>
    </div>
  )
}

export default Display
