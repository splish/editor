/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 * @copyright 2018-2019 Splish UG (haftungsbeschränkt)
 * @author Splish UG (haftungsbeschränkt)
 */
import { editable, editables, searchNodeEverywhere } from './editable'
import { focus } from './focus'
import { RootState } from '../types/state'

export const selectors = (store: { getState(): RootState }) => ({
  editable: (id: string) => editable(store.getState(), { id }),
  editables: () => editables(store.getState()),
  focus: () => focus(store.getState()),
  searchNodeEverywhere: (id: string) => searchNodeEverywhere(store.getState(), id)
})

export { editable, editables, focus, RootState }
