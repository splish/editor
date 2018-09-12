const { name, version } = require('../package.json')

export const slatePlugin = {
  name: name.replace('editor-plugin-', ''),
  version
}
