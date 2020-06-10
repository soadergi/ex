import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import TwitterShareButton from 'react-share/es/TwitterShareButton'
import RedditShareButton from 'react-share/es/RedditShareButton'
import FacebookShareButton from 'react-share/es/FacebookShareButton'
import TelegramShareButton from 'react-share/es/TelegramShareButton'
import VKShareButton from 'react-share/es/VKShareButton'

import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'

import Icon from 'weplay-components/Icon'

import container from './container'
import styles from './styles.scss'

const mods = ['article', 'miniGames']

const socialsButtonsMap = {
  twitter: TwitterShareButton,
  reddit: RedditShareButton,
  facebook: FacebookShareButton,
  telegram: TelegramShareButton,
  vk: VKShareButton,
}

const SocialShareButton = ({
  social,
  shareUrl,
  sharedText,
  iconName,
  color,
  modifiers,
  image,
}) => {
  const SocialButton = socialsButtonsMap[social]

  return (
    <div
      className={styles.wrapButton}
      {...getAnalyticsAttributes({
        category: 'Social',
        action: 'click',
        label: social,
        context: shareUrl,
        position: LOOKUP,
      })}
    >
      <SocialButton
        url={shareUrl}
        className={classNames(
          styles.button,
          styles[social],
          styles[color],
          setCSSModifiers(modifiers, styles),
        )}
        {...sharedText && { title: sharedText, quote: sharedText }}
        image={image}
      >
        <Icon
          iconName={iconName}
          className={styles.icon}
        />
      </SocialButton>
    </div>
  )
}

SocialShareButton.propTypes = {
  social: PropTypes.string.isRequired,
  shareUrl: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,

  // optional props
  color: PropTypes.string,
  modifiers: PropTypes.arrayOf(PropTypes.oneOf(mods)),
  sharedText: PropTypes.string,
}

SocialShareButton.defaultProps = {
  // optional props
  color: 'white',
  modifiers: [],
  sharedText: '',
}

export default container(SocialShareButton)
