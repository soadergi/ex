import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'

import container from './container'
import styles from './styles.scss'

const DropDown = ({
  children,
  label,
  handleClick,
  isVisible,
  modifiers,
  iconName,
}) => (
  <>
    <button
      className={classNames(
        styles.text,
        setCSSModifiers(modifiers, styles),
      )}
      onClick={handleClick}
      type="button"
    >
      {label}

      {iconName && (
        <Icon
          className={classNames(
            styles.icon,
          )}
          iconName={iconName}
          size="small"
        />
      )}
    </button>

    <div className={classNames(
      styles.options,
      {
        [styles.isVisible]: isVisible,
      },
      setCSSModifiers(modifiers, styles),
    )}
    >
      {children}
    </div>
  </>
)

DropDown.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  modifiers: PropTypes.arrayOf(PropTypes.string),
  iconName: PropTypes.string,
}

DropDown.defaultProps = {
  modifiers: [],
  iconName: '',
}

export default container(DropDown)
