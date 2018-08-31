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
 * @copyright 2018 Splish UG (haftungsbeschränkt)
 * @author Splish UG (haftungsbeschränkt)
 */
import { RESIZE_START, RESIZE_STOP } from '../actions/cell/resize'

export interface ResizeState {
  id?: string
}

// FIXME:
export const resize = (
  state: ResizeState = {},
  action: { type: string; id: string }
) => {
  switch (action.type) {
    case RESIZE_START:
      return {
        id: action.id
      }
    case RESIZE_STOP:
      // FIXME:
      if (action.id !== state.id) {
        console.log('ERROR', state, action)
      }
      return {}
    default:
      return state
  }
}
