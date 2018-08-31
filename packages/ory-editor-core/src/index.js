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
import Editable from './components/Editable'
import createStore from './store'
import { actions } from './actions'
import { selectors } from './selector'
import PluginService from './service/plugin'
import pluginDefault from './service/plugin/default'
import { forEach } from 'ramda'
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend'
import { DragDropContext as dragDropContext } from 'react-dnd'

let instance

const initialState = () => ({
  editables: {
    past: [],
    present: [],
    future: []
  }
})

const nativeTypes = editor =>
  editor.plugins.hasNativePlugin()
    ? [NativeTypes.URL, NativeTypes.FILE, NativeTypes.TEXT]
    : []

const update = editor => editable => {
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
  store
  plugins
  middleware

  dragDropContext
  defaultPlugin

  constructor({
    plugins,
    middleware = [],
    editables = [],
    defaultPlugin = pluginDefault,
    dragDropBackend
  } = {}) {
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
      console.log(this.plugins.serialize(editable))
      this.trigger.editable.update(this.plugins.serialize(editable))
    }, this.store.getState().editables.present)
  }

  setLayoutPlugins = (plugins = []) => {
    this.plugins.setLayoutPlugins(plugins)
    this.refreshEditables()
  }

  addLayoutPlugin = config => {
    this.plugins.addLayoutPlugin(config)
    this.refreshEditables()
  }

  removeLayoutPlugin = name => {
    this.plugins.removeLayoutPlugin(name)
    this.refreshEditables()
  }

  setContentPlugins = (plugins = []) => {
    this.plugins.setContentPlugins(plugins)
    console.log(this.store.getState())
    this.refreshEditables()
  }

  addContentPlugin = config => {
    this.plugins.addContentPlugin(config)
    this.refreshEditables()
  }

  removeContentPlugin = name => {
    this.plugins.removeContentPlugin(name)
    this.refreshEditables()
  }

  trigger = {}
  query = {}
}

export { PluginService, Editable, Editor }

export const createEmptyState = () => ({ id: v4(), cells: [] })

export default Editor
