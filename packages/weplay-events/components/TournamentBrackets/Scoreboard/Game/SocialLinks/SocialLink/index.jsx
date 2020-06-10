import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'

import styles from './styles.scss'
import container from './container'

const SocialLink = ({
  // required props
  url,
  iconName,
  linkClassName,

  // props from container
  handleClick,

  // optional props
}) => (
  <li className={styles.block}>
    <a
      href={url}
      onClick={handleClick}
      className={classNames(
        styles.link,
        styles[linkClassName],
        {
          [styles.isActive]: url,
        },
      )}
      target="_blank"
      rel="noreferrer noopener"
    >
      <Icon
        iconName={iconName}
        className={styles.icon}
      />
    </a>
  </li>
)

SocialLink.propTypes = {
  // required props
  iconName: PropTypes.string.isRequired,
  linkClassName: PropTypes.string.isRequired,
  // props from container
  handleClick: PropTypes.func.isRequired,

  // optional props
  url: PropTypes.string,
}

SocialLink.defaultProps = {
  // optional props
  url: '',
}

export default container(SocialLink)
