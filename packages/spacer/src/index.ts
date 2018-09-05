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
import { Spacer } from './spacer.component'

export default {
  Component: Spacer,
  name: '@splish-me/spacer',
  version: '0.0.1',
  text: 'Spacer',
  description: 'Resizeable, empty space.',

  handleRemoveHotKey: () => Promise.reject(),
  handleFocusPreviousHotKey: () => Promise.reject(),
  handleFocusNextHotKey: () => Promise.reject(),

  // We need this because otherwise we lose hotkey focus on elements like spoilers.
  // This could probably be solved in an easier way by listening to window.document?
  //
  handleFocus: (_props: unknown, _source: unknown, ref: HTMLElement) => {
    if (!ref) {
      return
    }
    setTimeout(() => ref.focus())
  }
}
