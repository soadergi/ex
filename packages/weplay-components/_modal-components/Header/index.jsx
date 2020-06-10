import classNames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'

const Header = ({
  title,
  subtitle,
  children,
  titleAlign,
}) => (
  <div className={classNames(
    styles.header,
    styles[titleAlign],
  )}
  >
    <p className={styles.title}>
      {title}
      {children}
    </p>
    {subtitle && (
    <p className={styles.subtitle}>
      {subtitle}
    </p>
    )}
  </div>
)

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  titleAlign: PropTypes.string,
}

Header.defaultProps = {
  // optional props
  title: '',
  children: null,
  subtitle: '',
  titleAlign: '',
}

export default Header
