import React from 'react'
import PropTypes from 'prop-types'

import SocialNetworksLogin from 'weplay-components/SocialNetworksLogin/loadable'

import SeparatorWithText from '../SeparatorWithText/SeparatorWithText'

import styles from './FooterSocials.scss'

const FooterSocials = ({
  text,
  logAuthEvent,
}) => (
  <div
    className={styles.block}
    data-abtest="social-login-footer"
  >
    <SeparatorWithText text={text} />
    <SocialNetworksLogin logAuthEvent={logAuthEvent} />
  </div>
)

FooterSocials.propTypes = {
  logAuthEvent: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}

export default FooterSocials
