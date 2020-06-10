import React from 'react'
import { storiesOf } from '@storybook/react'

import { MessageBlockMarkup } from './index'
import SvgIcon from 'weplay-components/SvgIcon';

storiesOf('weplay-smth/MessageBlockMarkup', module)
  .add('one state', () => (
    <MessageBlockMarkup
      text={(messageLinkClassName) => <span className={messageLinkClassName}>text</span>}
      icon={(iconClassName) => (
        <SvgIcon
          iconName="comments"
          type="color"
          className={iconClassName}
        />
      )}
    />
  ))

