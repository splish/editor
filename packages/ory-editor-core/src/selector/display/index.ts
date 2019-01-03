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
 *
 */

import {
  DISPLAY_MODE_EDIT,
  DISPLAY_MODE_LAYOUT,
  DISPLAY_MODE_PREVIEW,
  DISPLAY_MODE_INSERT,
  DISPLAY_MODE_RESIZING
} from '../../actions/display'

import { RootState } from '../../types/state'

export const mode = ({
  ory: {
    display: { mode }
  }
}: RootState) => mode

export const isPreviewMode = (state: RootState): boolean =>
  mode(state) === DISPLAY_MODE_PREVIEW
export const isLayoutMode = (state: RootState): boolean =>
  mode(state) === DISPLAY_MODE_LAYOUT
export const isEditMode = (state: RootState): boolean =>
  mode(state) === DISPLAY_MODE_EDIT
export const isInsertMode = (state: RootState): boolean =>
  mode(state) === DISPLAY_MODE_INSERT
export const isResizeMode = (state: RootState): boolean =>
  mode(state) === DISPLAY_MODE_RESIZING
