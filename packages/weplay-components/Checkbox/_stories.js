import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { text, boolean, select } from '@storybook/addon-knobs'

import { mods, Checkbox } from './index'

const actions = {
  handleChange: action('handleChange'),
}

storiesOf('weplay-components/Checkbox', module)
  .add('unchecked', () => (
    <Checkbox
      value={boolean('value', false)}
      handleChange={linkTo('Checkbox', 'checked')}
      modifiers={[select('modifiers', mods, mods[0])]}
      text={text('text', 'subscribe')}
    />
  ), {
    info: {

    },
  })
  .add('checked', () => (
    <Checkbox
      value={boolean('value', true)}
      handleChange={linkTo('Checkbox', 'unchecked')}
      modifiers={[select('modifiers', mods, mods[0])]}
      text={text('text', 'subscribe')}
    />
  ))
  .add('with children', () => (
    <Checkbox
      value={boolean('value', true)}
      handleChange={actions.handleChange}
      modifiers={[select('modifiers', mods, mods[0])]}
    >
      <span style={{ color: 'red', background: 'yellow' }}>
        custom children
      </span>
    </Checkbox>
  ), {
    notes: 'U can"t use text property here - text takes prescedence over children',
  })
