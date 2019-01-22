import { generateChangelog } from '@splish-me/changelog'
import * as fs from 'fs'
import * as path from 'path'
import * as util from 'util'

const writeFile = util.promisify(fs.writeFile)

exec().then(() => {
  console.log('done')
})

async function exec(): Promise<void> {
  const content = await generateChangelog([
    {
      tagName: '0.4.5',
      date: '2019-01-14'
    },
    {
      breakingChanges: ["Don't provide `module` entry anymore"],
      added: ['Pass plugins as dictionary'],
      deprecated: ['Deprecate passing plugins as array'],
      fixed: [
        'Serialize nested documents correctly',
        'Handle edge cases of undo/redo correctly'
      ]
    }
  ])

  await writeFile(path.join(__dirname, '..', 'CHANGELOG.md'), content)
}
