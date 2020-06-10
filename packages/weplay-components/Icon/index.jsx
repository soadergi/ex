import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import container from './container'
import styles from './styles.scss'

const Icon = ({
  // required props
  iconName,
  title,

  // container props

  // optional props
  className,
  size,
  ...rest
}) => (
  <span
    className={classNames(
      styles.block,
      className,
      styles[size],
    )}
    title={title}
    {...rest}
  >
    <svg className={styles.svg}>
      <use
        xlinkHref={`#sprite_${iconName}`}
      />
    </svg>
  </span>
)

Icon.propTypes = {
  // required props
  iconName: PropTypes.string.isRequired,

  // container props

  // optional props
  className: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string,
}

Icon.defaultProps = {
  // optional props
  className: '',
  size: '',
  title: '',
}

export default container(Icon)
