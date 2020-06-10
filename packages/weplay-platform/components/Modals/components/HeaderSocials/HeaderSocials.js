import React from 'react'
import PropTypes from 'prop-types'

import SocialNetworksLoginList from 'weplay-components/SocialNetworksLoginList/SocialNetworksLoginList'

import SeparatorWithText from '../SeparatorWithText/SeparatorWithText'

import styles from './HeaderSocials.scss'

const HeaderSocials = ({
  text,
  logAuthEvent,
}) => (
  <div
    className={styles.block}
    data-abtest="social-login-header"
  >
    <SocialNetworksLoginList logAuthEvent={logAuthEvent} />
    <SeparatorWithText text={text} />
  </div>
)

HeaderSocials.propTypes = {
  logAuthEvent: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}

export default HeaderSocials
