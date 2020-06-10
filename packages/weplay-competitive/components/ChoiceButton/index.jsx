import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SvgIcon from 'weplay-components/SvgIcon'

import styles from './styles.scss'

const ChoiceButton = ({
  // required props
  isDisabled,
  icon,
  text,
  clickHandler,
  // container props

  // optional props
  className,
  isDropped,
}) => (
  <button
    type="button"
    disabled={isDisabled}
    onClick={clickHandler}
    className={classNames(
      styles.wrapper,
      className,
      {
        [styles.isDropped]: isDropped,
        [styles.isDisabled]: isDisabled,
      },
    )}
  >
    <SvgIcon
      className={styles.icon}
      iconName={icon}
    />
    <span className={styles.text}>
      {text}
    </span>
  </button>
)

ChoiceButton.propTypes = {
  // required props
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  // container props

  // optional props
  isDisabled: PropTypes.bool,
  isDropped: PropTypes.bool,
  className: PropTypes.string,
  clickHandler: PropTypes.func,
}

ChoiceButton.defaultProps = {
  // optional props
  isDisabled: false,
  isDropped: false,
  className: '',
  clickHandler: () => {},
}

export default ChoiceButton
