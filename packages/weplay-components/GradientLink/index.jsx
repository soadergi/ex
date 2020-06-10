import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Link from 'weplay-components/Link'

import container from './container'
import styles from './styles.scss'

const GradientLink = ({
  // required props
  to,
  text,
  // container props
  // optional props
  className,
  ...props
}) => (
  <Link
    to={to}
    className={classNames(
      styles.link,
      className,
    )}
    {...props}
  >
    {text}
  </Link>
)

GradientLink.propTypes = {
  // required props
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  // container props

  // optional props
  className: PropTypes.string,
}

GradientLink.defaultProps = {
  // optional props
  className: '',
}

export default container(GradientLink)
