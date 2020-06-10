import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'

import Logo from 'weplay-components/Logo'

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

const Avatar = ({
  avatar,
  alt,
  className,
  imageClassName,
  isObjectContain,
  isPlaceholderDark,
  isPremiumAccount,
  shape,
  responsive,
  size,
}) => (
  <div className={classNames(
    styles.block,
    className,
    styles[shape],
    styles[`size-${size}`],
    {
      [styles.isObjectContain]: isObjectContain,
      [styles.placeholderDark]: isPlaceholderDark,
      [styles.premiumAccount]: isPremiumAccount,
      [styles[`size-${responsive.sm}-sm`]]: responsive.sm,
      [styles[`size-${responsive.md}-md`]]: responsive.md,
      [styles[`size-${responsive.lg}-lg`]]: responsive.lg,
    },
  )}
  >
    <figure
      className={classNames(
        styles.image,
        imageClassName,
      )}
      data-qa-id={dataQaIds.components.userAvatar.image}
    >
      {avatar
        ? (
          <img
            src={avatar}
            alt={alt}
            className={styles.picture}
          />
        )
        : (
          <div className={styles.placeholder}>
            <Logo
              color={!isPlaceholderDark ? 'dark' : ''}
              isFluid
              isSmall
            />
          </div>
        )}
    </figure>
  </div>
)

Avatar.propTypes = {
  avatar: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  imageClassName: PropTypes.string,
  shape: PropTypes.oneOf(shapes),
  isObjectContain: PropTypes.bool,
  isPlaceholderDark: PropTypes.bool,
  isPremiumAccount: PropTypes.bool,
  size: PropTypes.oneOf(sizes),
  responsive: PropTypes.shape({
    sm: PropTypes.string,
    md: PropTypes.string,
    lg: PropTypes.string,
  }),
}

Avatar.defaultProps = {
  avatar: '',
  alt: 'avatar',
  className: '',
  imageClassName: '',
  shape: '',
  isObjectContain: false,
  isPlaceholderDark: false,
  isPremiumAccount: false,
  size: '',
  responsive: {},
}

export default container(Avatar)
