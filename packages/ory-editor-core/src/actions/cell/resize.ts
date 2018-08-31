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
export const RESIZE_START = 'RESIZE_START'
export const RESIZE_STOP = 'RESIZE_STOP'

export const resizeStart = (id: string) => ({
  type: RESIZE_START,
  ts: new Date(),
  id
})

export const resizeStop = (id: string) => ({
  type: RESIZE_STOP,
  ts: new Date(),
  id
})
