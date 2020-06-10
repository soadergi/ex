import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'

import container from './container'
import styles from './styles.scss'

const SocialLink = ({
  path,
  icon,
  modifiers,
  handleClickAnalytics,
}) => (
  <a
    className={classNames(
      styles.link,
      styles[icon],
      setCSSModifiers(modifiers, styles),
    )}
    href={path}
    target="_blank"
    rel="noreferrer noopener"
    onClick={handleClickAnalytics}
  >
    <Icon
      type={(icon === 'liquipedia' ? 'color' : '')}
      iconName={icon}
      className={classNames(
        styles.icon,
        styles[icon],
      )}
    />
  </a>
)

SocialLink.propTypes = {
  path: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  modifiers: PropTypes.arrayOf(PropTypes.string),
  handleClickAnalytics: PropTypes.func.isRequired,
}

SocialLink.defaultProps = {
  modifiers: [],
}

export default container(SocialLink)
