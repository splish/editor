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
import { v4 } from 'uuid'
// @ts-ignore
import createDragDropContext from './components/DragDropContext'
// @ts-ignore
import Inner from './components/Editable/Inner'
// @ts-ignore
import Editable from './components/Editable'
// @ts-ignore
import createStore from './store'
// @ts-ignore
import { actions } from './actions'
// @ts-ignore
import { editable as editableReducer } from './reducer/editable'
// @ts-ignore
import { selectors } from './selector'
// @ts-ignore
import PluginService from './service/plugin'
// @ts-ignore
import pluginDefault from './service/plugin/default'

import { forEach } from 'ramda'
// @ts-ignore
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend'
// @ts-ignore
import { DragDropContext as dragDropContext } from 'react-dnd'

let instance: any

const initialState = () => ({
  editables: {
    past: [],
    present: [],
    future: []
  }
})

const nativeTypes = (editor: Editor) =>
  editor.plugins.hasNativePlugin()
    ? [NativeTypes.URL, NativeTypes.FILE, NativeTypes.TEXT]
    : []

const update = (editor: Editor) => (editable: any) => {
  const state = editor.plugins.unserialize(editable)
  actions(editor.store.dispatch).editable.update({
    ...state,
    config: {
      plugins: editor.plugins,
      whitelist: [
        ...editor.plugins.getRegisteredNames(),
        ...nativeTypes(editor)
      ]
    }
  })
}

const dndBackend = HTML5Backend

/**
 * Editor is the core interface for dealing with the editor.
 */
class Editor {
  store: any
  plugins: any
  middleware: any

  dragDropContext: any
  defaultPlugin: any

  constructor({
    plugins,
    middleware = [],
    editables = [],
    defaultPlugin = pluginDefault,
    dragDropBackend
  }: any = {}) {
    if (instance) {
      console.warn(
        'You defined multiple instances of the Editor class, this can cause problems.'
      )
    }

    instance = this
    this.store = createStore(initialState(), middleware)
    this.plugins = new PluginService(plugins)
    this.middleware = middleware
    this.trigger = actions(this.store.dispatch)
    this.query = selectors(this.store)
    this.defaultPlugin = defaultPlugin
    this.dragDropContext = dragDropContext(dragDropBackend || dndBackend)

    this.trigger.editable.add = update(this)
    this.trigger.editable.update = update(this)

    editables.forEach(this.trigger.editable.add)
  }

  refreshEditables = () => {
    forEach(editable => {
      this.trigger.editable.update(this.plugins.serialize(editable))
    }, this.store.getState().editables.present)
  }

  setLayoutPlugins = (plugins = []) => {
    this.plugins.setLayoutPlugins(plugins)
    this.refreshEditables()
  }

  addLayoutPlugin = (config: any) => {
    this.plugins.addLayoutPlugin(config)
    this.refreshEditables()
  }

  removeLayoutPlugin = (name: any) => {
    this.plugins.removeLayoutPlugin(name)
    this.refreshEditables()
  }

  setContentPlugins = (plugins = []) => {
    this.plugins.setContentPlugins(plugins)
    this.refreshEditables()
  }

  addContentPlugin = (config: any) => {
    this.plugins.addContentPlugin(config)
    this.refreshEditables()
  }

  removeContentPlugin = (name: any) => {
    this.plugins.removeContentPlugin(name)
    this.refreshEditables()
  }

  trigger: any  = {}
  query: any = {}
}

export {
  PluginService,
  Editable,
  Editor,
  selectors,
  createDragDropContext,
  Inner,
  editableReducer
}

export const createEmptyState = () => ({ id: v4(), cells: [] })

export default Editor
