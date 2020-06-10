import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import NotConnectedLink from 'weplay-components/Link/NotConnectedLink'
import BetaLabel from 'weplay-components/BetaLabel'

import container from './container'
import styles from './styles.scss'

const NavigationItem = ({
  // required props
  navigationItem,
  currentLanguage,
  // container props
  isActive,
  // optional props
}) => (
  <li className={styles.block}>
    <NotConnectedLink
      locale={currentLanguage}
      className={classNames(
        styles.link,
        { [styles.isActive]: isActive },
      )}
      to={navigationItem.url}
    >
      <div className={styles.content}>
        <span className={styles.title}>
          {navigationItem.localizations.title}
          {navigationItem.localizations.label && (
            <BetaLabel text={navigationItem.localizations.label} />
          )}
        </span>
        {navigationItem.localizations.description && (
          <span className={styles.subtitle}>{navigationItem.localizations.description}</span>
        )}
      </div>
    </NotConnectedLink>
  </li>
)

NavigationItem.propTypes = {
  // required props
  navigationItem: PropTypes.shape({
    url: PropTypes.string,
    localizations: PropTypes.shape({
      label: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  }).isRequired,
  currentLanguage: PropTypes.string.isRequired,
  // container props
  isActive: PropTypes.bool.isRequired,
  // optional props
}

export default container(NavigationItem)
