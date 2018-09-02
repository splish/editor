import * as Delta from 'quill-delta'
import { Document, Value } from 'slate'

import { Text } from './text.component'

export const textPlugin = {
  Component: Text,
  name: '@splish-me/text',
  version: '0.0.0',
  text: 'Text',
  unserialize: state => {
    return {
      value: Value.fromJSON(state.value)
    }
  },
  serialize: state => {
    return {
      value: Value.toJSON(state.value)
    }
  },
  createInitialState: () => {
    return {
      value: Value.fromJSON({
        document: {
          nodes: [
            {
              object: 'block',
              type: 'paragraph',
              nodes: [
                {
                  object: 'text',
                  leaves: [
                    {
                      text: ''
                    }
                  ]
                }
              ]
            }
          ]
        }
      })
    }
  }
}
