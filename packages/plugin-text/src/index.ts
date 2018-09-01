import * as Delta from 'quill-delta'

import { Text } from './text.component'

export const textPlugin = {
  Component: Text,
  name: '@splish-me/text',
  version: '0.0.0',
  text: 'Text',
  unserialize: state => {
    return {
      value: new Delta(state.value)
    }
  },
  serialize: state => {
    console.log('serialize', state)
    return state
  },
  createInitialState: () => {
    return {
      value: new Delta()
    }
  }
}
