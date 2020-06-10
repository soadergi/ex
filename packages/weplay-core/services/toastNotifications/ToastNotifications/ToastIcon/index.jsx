import React from 'react'
import * as PropTypes from 'prop-types'
import classNames from 'classnames'

import container from './container'
import styles from './styles.scss'

const ToastIcon = ({
  // required props
  iconName,
  title,

  // container props

  // optional props
  className,
  size,
}) => (
  <span
    className={classNames(
      styles.block,
      className,
      styles[size],
    )}
    title={title}
  >
    <svg className={styles.svg}>
      <use
        xlinkHref={`#sprite_${iconName}`}
      />
    </svg>
  </span>
)

ToastIcon.propTypes = {
  // required props
  iconName: PropTypes.string.isRequired,

  // container props

  // optional props
  className: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string,
}

ToastIcon.defaultProps = {
  // optional props
  className: '',
  size: '',
  title: '',
}

export default container(ToastIcon)
