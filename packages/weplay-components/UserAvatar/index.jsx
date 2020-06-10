import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'

import Avatar from '../Avatar'

import styles from './styles.scss'
import container from './container'

const sizes = [
  '',
  '24',
  '32',
  '40',
  '48',
  '64',
  '96',
  '128',
]

const shapes = [
  '',
  'square',
]

const UserAvatar = ({
  avatar,
  alt,
  className,
  isPremiumAccount,
  isPlaceholderDark,
  responsive,
  size,
  shape,
}) => (
  <div className={classNames(
    styles.block,
    className,
    styles[`size-${size}`],
    {
      [styles.isPremium]: isPremiumAccount,
      [styles[`size-${responsive.sm}-sm`]]: responsive.sm,
      [styles[`size-${responsive.md}-md`]]: responsive.md,
      [styles[`size-${responsive.lg}-lg`]]: responsive.lg,
    },
  )}
  >
    <Avatar
      shape={shape}
      avatar={avatar}
      alt={alt}
      isPlaceholderDark={isPlaceholderDark}
      isPremiumAccount={isPremiumAccount}
    />
    {isPremiumAccount && (
    <span className={styles.iconWrapper}>
      <Icon
        iconName="premium"
        className={styles.icon}
      />
    </span>
    )}
  </div>
)

UserAvatar.propTypes = {
  avatar: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  shape: PropTypes.oneOf(shapes),
  isPremiumAccount: PropTypes.bool,
  size: PropTypes.oneOf(sizes),
  isPlaceholderDark: PropTypes.bool,
  responsive: PropTypes.shape({
    sm: PropTypes.string,
    md: PropTypes.string,
    lg: PropTypes.string,
  }),
}

UserAvatar.defaultProps = {
  avatar: '',
  alt: 'avatar',
  className: '',
  shape: '',
  size: '',
  isPremiumAccount: false,
  isPlaceholderDark: false,
  responsive: {},
}

export default container(UserAvatar)
