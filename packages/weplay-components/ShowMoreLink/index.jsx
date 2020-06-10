import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'
import container from './container'

const ShowMoreLink = ({
  // required props
  linkUrl,
  linkText,
  logLinkClick,
  // optional props
  isVisible,
  target,
}) => (
  <a
    target={target}
    href={linkUrl}
    onClick={logLinkClick}
    className={classNames(
      styles.showAll,
      { [styles.isVisible]: isVisible },
    )}
  >
    {linkText}
  </a>
)

ShowMoreLink.propTypes = {
  // required props
  linkUrl: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  logLinkClick: PropTypes.func.isRequired,
  target: PropTypes.string,
  // props from container

  // optional props
  isVisible: PropTypes.bool,
}

ShowMoreLink.defaultProps = {
  // optional props
  isVisible: false,
  target: '_self',
}

export default container(ShowMoreLink)
