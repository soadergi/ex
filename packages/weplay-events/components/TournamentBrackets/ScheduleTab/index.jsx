import React from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'

import container from './container'
import styles from './sheduleTab.scss'

const ScheduleTab = ({
  // required props
  tab,
  onClick,
  isActive,

  // props from container

  // optional props
}) => (
  <button
    type="button"
    className={className(
      styles.button,
      {
        [styles.isActive]: isActive,
      },
    )}
    onClick={onClick}
  >
    <span className={styles.text}>{JSON.stringify(tab.title).replace(/"/g, '')}</span>
  </button>
)

ScheduleTab.propTypes = {
  // required props
  tab: PropTypes.shape({

  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,

  // props from container

  // optional props
}

ScheduleTab.defaultProps = {
  // optional props
}

export default container(ScheduleTab)
