import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { footerNav, footerInfo, footerPress } from 'config/sidebar'

import FooterNavItem from './FooterNavItem'
import container from './container'
import styles from './styles.scss'
import LanguageSwitch from './LanguageSwitch'

const FooterNav = ({
  toggleSidebar,
  logAnalyticsWithAction,
}) => (
  <div>
    <LanguageSwitch />
    <nav className={styles.footerNav}>
      <ul className={classNames(
        styles.list,
      )}
      >
        {footerPress.map(item => (
          <FooterNavItem
            key={item.key}
            item={item}
            toggleSidebar={toggleSidebar}
            logAnalyticsWithAction={logAnalyticsWithAction}
          />
        ))}
      </ul>
      <ul className={styles.list}>
        {footerNav.map(item => (
          <FooterNavItem
            key={item.key}
            item={item}
            toggleSidebar={toggleSidebar}
            logAnalyticsWithAction={logAnalyticsWithAction}
          />
        ))}
      </ul>
      <ul className={styles.list}>
        {footerInfo.map(item => (
          <FooterNavItem
            key={item.key}
            item={item}
            toggleSidebar={toggleSidebar}
            logAnalyticsWithAction={logAnalyticsWithAction}
          />
        ))}
      </ul>
    </nav>
  </div>
)

FooterNav.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  logAnalyticsWithAction: PropTypes.func.isRequired,
}

export default container(FooterNav)
