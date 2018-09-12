import { createHeadingsPlugin } from './plugins/headings'
import { createParagraphPlugin } from './plugins/paragraph'
import { createRichTextPlugin } from './plugins/rich-text'
import { createLinkPlugin } from './plugins/link'
import { createCodePlugin } from './plugins/code'
import { createListsPlugin } from './plugins/lists'

export const defaultPlugins = [
  createParagraphPlugin(),
  createRichTextPlugin(),
  createLinkPlugin(),
  createHeadingsPlugin(),
  createCodePlugin(),
  createListsPlugin()
]
