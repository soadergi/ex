import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'
import container from './container'

const Tab = ({
  // required props
  tab,
  handleClick,
  activeTab,
  // container props

  // optional props
  className,
  color,
}) => (
  <li
    className={classNames(
      styles.item,
      className,
    )}
  >
    <button
      type="button"
      onClick={handleClick}
      className={classNames(
        styles.button,
        styles[color],
        {
          [styles.isActive]: activeTab,
        },
      )}
    >
      {tab}
    </button>
  </li>
)

Tab.propTypes = {
  // required props
  tab: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  activeTab: PropTypes.bool.isRequired,
  // container props

  // optional props
  className: PropTypes.string,
  color: PropTypes.string,
}

Tab.defaultProps = {
  // optional props
  className: '',
  color: '',
}

export default container(Tab)
