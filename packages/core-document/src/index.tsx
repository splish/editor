/**
 * Nestable editable
 */
import { DocumentContext } from '@splish-me/editor-core-contexts'
import { DocumentIdentifier, DocumentProps } from '@splish-me/editor-core-types'
import * as React from 'react'
import * as uuid from 'uuid'

export const createDocumentIdentifier = (
  id = uuid.v4()
): DocumentIdentifier => {
  return {
    $$typeof: 'splish.document',
    id
  }
}

export class Document extends React.Component<DocumentProps> {
  state = { error: null }

  public render() {
    if (this.state.error) {
      return (
        <React.Fragment>
          <p>Something wen't wrong.</p>
          <button onClick={() => this.setState({ error: null })}>Retry</button>
        </React.Fragment>
      )
    }

    return (
      <DocumentContext.Consumer>
        {Doc => {
          return <Doc {...this.props} />
        }}
      </DocumentContext.Consumer>
    )
  }

  componentDidCatch(error: Error, info: unknown) {
    console.log('catched error', error, info)
    this.setState({ error })
  }
}
