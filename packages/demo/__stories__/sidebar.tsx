import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { mockContentPlugin } from '../src/mock-content.plugin'
import { mockWrapperPlugin } from '../src/mock-wrapper.plugin'
import { EditableStory } from '../src'

import { Sidebar } from '@splish-me/editor-ui/src/sidebar.component'

class SidebarStory extends React.Component {
  public state = { active: false }
  private mounted = false

  public componentDidMount() {
    this.mounted = true
    setInterval(() => {
      if (this.mounted) {
        this.setState({ active: !this.state.active })
      }
    }, 1000)
  }

  public componentWillUnmount() {
    this.mounted = false
  }

  public render() {
    return <Sidebar active={this.state.active}>{this.props.children}</Sidebar>
  }
}

storiesOf('Sidebar', module).add('foo', () => (
  <React.Fragment>
    <SidebarStory>Foobar</SidebarStory>
    bar
  </React.Fragment>
))
