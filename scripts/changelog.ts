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
      tagName: '0.5.0',
      date: '2019-01-22',
      breakingChanges: [
        '`@splish-me/editor` replaces `@splish-me/editor-core`, `@splish-me/editor-core-contexts`, `@splish-me/editor-core-document` and `@splish-me/editor-core-types`',
        '`@splish-me/editor-html-renderer` replaces `@splish-me/editor-core-html-renderer`',
        '`@splish-me/editor-renderer` replaces `@splish-me/editor-core-renderer`',
        '`@splish-me/editor-ui` replaces `@splish-me/editor-ui-add-sidebar`, `@splish-me/editor-ui-mode-toolbar`, `@splish-me/editor-ui-plugin-sidebar` and `@splish-me/editor-ui-sidebar`',
        "Don't provide `module` entry anymore"
      ],
      added: ['Add shortcuts for undo and redo', 'Pass plugins as dictionary'],
      deprecated: [
        'Passing plugins as array is deprecated and will be removed in the next minor version. Pass plugins as dictionary instead.'
      ],
      fixed: [
        'Serialize nested documents correctly',
        'Handle edge cases of undo/redo correctly'
      ]
    }
  ])

  await writeFile(path.join(__dirname, '..', 'CHANGELOG.md'), content)
}
