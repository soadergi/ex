import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'

// TODO: REMOVE THIS DUPLICATE. Core should not depend on components
const SvgIcon = ({
  iconName,
  type,
  className,
  id,
}) => (
  <svg
    className={classNames(
      styles.icon,
      `ic-${iconName}`,
      'g-icon',
      {
        [className]: className,
      },
    )}
    id={id || null}
  >
    <use
      xlinkHref={
        type === 'color'
          ? `#sprite.c_${iconName}`
          : `#sprite.m_ic-${iconName}`
      }
    />
  </svg>
)

SvgIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
}

SvgIcon.defaultProps = {
  type: '',
  className: '',
  id: '',
}

export default SvgIcon
