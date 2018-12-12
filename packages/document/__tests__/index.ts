import { Document } from '../src/v0'

describe('V0', () => {
  test('one content plugin', () => {
    const document: Document = {
      id: 'foo',
      cells: [{
        id: 'foo',
        size: 12,
        content: {
          plugin: {
            name: 'bar',
            version: '1.0.0'
          },
          state: {}
        }
      }],
      hasInlineChildren: false
    }

    expect(Document.is(document)).toBeTruthy()
  })
})
