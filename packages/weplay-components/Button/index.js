import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Link from 'weplay-components/Link'

import Icon from '../Icon'

import styles from './styles.scss'

export const ICON_SIDE = {
  RIGHT: 'right',
  LEFT: 'left',
}

export const BUTTON_SIZE = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
}

export const BUTTON_PRIORITY = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  GHOST: 'ghost',
  GHOST_WHITE: 'ghostWhite',
  LINK: 'link',
  RESET: 'reset',
}

export const BUTTON_COLOR = {
  BASIC: 'basic',
  SUCCESS: 'success',
  DANGER: 'danger',
  CTA: 'cta',
  GOLD: 'gold',
  GRAY: 'gray',
  WHITE: 'white', // only for outline button
  BLACK: 'black', // only for outline button
  // socials
  TWITCH: 'twitch',
  DISCORD: 'discord',
  FACEBOOK: 'facebook',
  TELEGRAM: 'telegram',
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  STEAM: 'steam',
  YOUTUBE: 'youtube',
  VK: 'vk',
  LINKEDIN: 'linkedin',
  GOOGLE: 'google',
}

const Button = ({
  href,
  className,
  disabled,
  type,
  icon,
  children,
  size,
  priority,
  color,
  iconSide,
  isLoading,
  ...props
}) => {
  const body = (
    <>
      { icon && (
        <Icon
          className={styles.icon}
          iconName={icon}
          size="small"
        />
      ) }
      { children }
    </>
  )

  const buttonStyles = (
    classNames(
      styles.block,
      styles[size],
      styles[priority],
      styles[color],
      {
        [styles.right]: iconSide === ICON_SIDE.RIGHT,
        [styles.left]: iconSide === ICON_SIDE.LEFT,
        [styles.disabled]: disabled,
        [styles.isLoading]: isLoading,
      },
      className,
    )
  )

  return (
    <>
      { href && (
        <Link
          to={href}
          className={buttonStyles}
          {...props}
        >
          {isLoading && (
            <div className={styles.dots} />
          )}

          {body}
        </Link>
      )}
      { !href && (
        <button // eslint-disable-line react/button-has-type
          type={type}
          disabled={isLoading || disabled}
          className={buttonStyles}
          {...props}
        >
          {isLoading && (
            <div className={styles.dots} />
          )}

          {body}
        </button>
      )}
    </>
  )
}

Button.propTypes = {
  href: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
  iconSide: PropTypes.oneOf(Object.values(ICON_SIDE)),
  size: PropTypes.oneOf(Object.values(BUTTON_SIZE)),
  priority: PropTypes.oneOf(Object.values(BUTTON_PRIORITY)),
  color: PropTypes.oneOf(Object.values(BUTTON_COLOR)),
}

Button.defaultProps = {
  href: '',
  className: '',
  type: 'button',
  icon: '',
  children: null,
  disabled: false,
  isLoading: false,
  priority: BUTTON_PRIORITY.PRIMARY,
  color: BUTTON_COLOR.BASIC,
  size: BUTTON_SIZE.MD,
  iconSide: ICON_SIDE.LEFT,
}

export default React.memo(Button)
