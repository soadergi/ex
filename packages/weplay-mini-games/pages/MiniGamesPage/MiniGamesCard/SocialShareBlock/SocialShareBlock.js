import React from 'react'
import PropTypes from 'prop-types'

import CopyLink from 'weplay-components/CopyLink/loadable'
import Icon from 'weplay-components/Icon'
import SocialShareButton from 'weplay-components/SocialShareButton/loadable'

import styles from './SocialShareBlock.scss'

const buttonModification = ['miniGames']

const SocialShareBlock = ({ linkUrl, socials }) => (
  <div className={styles.block}>
    {socials.map(social => (
      <li
        className={styles.item}
        key={social}
      >
        <SocialShareButton
          social={social.toLowerCase()}
          modifiers={buttonModification}
          color="blue"
          url={linkUrl}
        />
      </li>
    ))}
    {socials.length >= 1 && (
      <CopyLink
        text={linkUrl}
      >
        <Icon
          iconName="link"
          className={styles.icon}
        />
      </CopyLink>
    )}

  </div>
)

export default React.memo(SocialShareBlock)

SocialShareBlock.propTypes = {
  socials: PropTypes.arrayOf(PropTypes.string).isRequired,
  linkUrl: PropTypes.string.isRequired,
}
