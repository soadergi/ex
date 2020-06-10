import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'

import Icon from '../Icon'

import styles from './styles.scss'
import container from './container'

const mods = [
  '',
  'blockBorderBlue',
  'blockBorderWhite',
  'blockBorderLess',
  'blockBorderMagenta',
  'blockWhite',
  'blockPink',
  'blockFile',
  'blockPromoMedium',
  'blockPromoSmall',
  'blockCta',
  'blockSuccess',
  'blockDanger',
  'blockLink',
  'blockPremium',
  'blockWide',
]

const LegacyButton = ({
  text,
  className,
  disabled,
  type,
  icon,
  styleIcon,
  modifiers,
  children,
  ...props
}) => (
  <button // eslint-disable-line react/button-has-type
    type={type}
    disabled={disabled}
    className={classNames(
      styles.block,
      setCSSModifiers(modifiers, styles),
      className,
    )}
    {...props}
  >
    {icon && (
      <Icon
        className={classNames(
          styles.icon,
          styleIcon,
        )}
        iconName={icon}
      />
    )}

    {!R.isEmpty(text) && (<span className={styles.text}>{text}</span>)}
    {children}
  </button>
)

LegacyButton.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.string,
  styleIcon: PropTypes.string,
  modifiers: PropTypes.arrayOf(
    PropTypes.oneOf(
      mods.map(mod => mod),
    ),
  ),
  children: PropTypes.node,
}

LegacyButton.defaultProps = {
  text: '',
  className: '',
  type: 'button',
  icon: '',
  styleIcon: '',
  modifiers: [],
  children: null,
  disabled: false,
}

export default container(LegacyButton)
