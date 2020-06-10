import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Logo from 'weplay-components/Logo'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'
import imgPropType from 'weplay-core/customPropTypes/imgPropType'

import styles from './styles.scss'

const mods = [
  'lg',
  'sm',
  'extra-sm',
  'extra-xl',
  'dark-blue-bg',
  'square',
  'isDisableBorder',
  'inverted',
  'alignItemsTop',
  'teamsList',
  'isActive',
  'isCaptain',
  'isDisableBorderRadius',
  'isDisableOverflow',
]

const UserAvatarLegacy = ({
  avatar,
  alt,
  className,
  imageClassName,
  modifiers,
  size,
  isPlaceholderDark,
  isFluid,
  hasDarkBackground,
}) => (
  <div className={classNames(
    styles.block,
    setCSSModifiers(modifiers, styles),
    className,
    styles[`width-${size}`],
    {
      [styles.placeholderDark]: isPlaceholderDark,
      [styles.isFluid]: isFluid,
      [styles.hasDarkBackground]: hasDarkBackground,
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
            className="o-img-responsive"
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

UserAvatarLegacy.propTypes = {
  avatar: imgPropType,
  alt: PropTypes.string,
  className: PropTypes.string,
  imageClassName: PropTypes.string,
  modifiers: PropTypes.arrayOf(PropTypes.oneOf(mods)),
  size: PropTypes.string,
  isPlaceholderDark: PropTypes.bool,
  isFluid: PropTypes.bool,
  hasDarkBackground: PropTypes.bool,
}

UserAvatarLegacy.defaultProps = {
  avatar: '',
  alt: 'avatar',
  className: '',
  imageClassName: '',
  modifiers: [],
  size: '',
  isPlaceholderDark: false,
  isFluid: false,
  hasDarkBackground: false,
}

export default React.memo(UserAvatarLegacy)
