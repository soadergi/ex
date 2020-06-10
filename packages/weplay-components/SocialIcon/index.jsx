import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'

import Icon from '../Icon'

import container from './container'
import styles from './styles.scss'

const SocialIcon = ({
  path,
  icon,
  size,
  color,
}) => (
  <a
    className={classNames(
      styles.block,
      styles[color],
      styles[icon],
    )}
    href={path}
    target="_blank"
    rel="noreferrer noopener"
    {...getAnalyticsAttributes({
      category: 'Social',
      action: 'click',
      label: path,
      position: LOOKUP,
    })}
  >
    <Icon
      iconName={icon}
      className={styles.icon}
      size={size}
    />
  </a>
)

SocialIcon.propTypes = {
  path: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.string,
}

SocialIcon.defaultProps = {
  size: '',
}

export default container(SocialIcon)
