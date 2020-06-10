import React from 'react'
import PropTypes from 'prop-types'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'
import Link from 'weplay-components/Link'

import styles from './styles.scss'
import container from './container'

const SectionHeader = ({
  // required props
  title,

  // optional props
  children,
  hasLinkArrow,
  linkUrl,
  linkText,
  logLinkClick,
  modifiers,
  isMobileWidth,
}) => (
  <div className={classNames(
    styles.sectionHeader,
    setCSSModifiers(modifiers, styles),
  )}
  >
    <h1 className={styles.sectionHeaderTitle}>
      {title}
    </h1>

    {(linkUrl && linkText) && (
      <div className={styles.sectionHeaderLinks}>

        {!isMobileWidth && (
          <Link
            to={linkUrl}
            className={styles.sectionHeaderLink}
            onClick={logLinkClick}
            target="_blank"
          >
            {linkText}
          </Link>
        )}

        {children && (
          <span className={styles.sectionHeaderSponsorLink}>
            {children}
          </span>
        )}

        {hasLinkArrow && (
          <Icon
            className={styles.icon}
            iconName="arrow-link"
          />
        )}
      </div>
    )}
  </div>
)

SectionHeader.propTypes = {
  // required props
  title: PropTypes.string.isRequired,
  logLinkClick: PropTypes.func.isRequired,
  isMobileWidth: PropTypes.bool.isRequired,

  // optional props
  children: PropTypes.node,
  hasLinkArrow: PropTypes.bool,
  linkUrl: PropTypes.string,
  linkText: PropTypes.string,
  modifiers: PropTypes.arrayOf(PropTypes.string),
}

SectionHeader.defaultProps = {
  children: null,
  hasLinkArrow: false,
  linkUrl: '',
  linkText: '',
  modifiers: [],
}

export default container(SectionHeader)
