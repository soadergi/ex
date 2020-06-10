import React from 'react'
import PropTypes from 'prop-types'
import SocialLinks from 'weplay-components/SocialLinks'
import classNames from 'classnames'

import FooterNav from './FooterNav'
import container from './container'
import styles from './styles.scss'

const socialLinksModifications = ['footer']

const Footer = ({
  i18nTexts,
  toggleSidebar,
  logAnalyticsWithAction,
}) => (
  <footer className={styles.block}>
    <FooterNav
      toggleSidebar={toggleSidebar}
      logAnalyticsWithAction={logAnalyticsWithAction}
    />
    <SocialLinks
      modifiers={socialLinksModifications}
    />
    <p className={classNames(
      styles.copy,
      'js-footer-nav-copy-animated',
    )}
    >
      {`2011 - ${(new Date()).getFullYear()} WePlay!`}
      <br />
      {' '}
      {i18nTexts.text.allRightsReserved}
      {' '}
    </p>
  </footer>
)

Footer.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  logAnalyticsWithAction: PropTypes.func.isRequired,
}

export default container(Footer)
