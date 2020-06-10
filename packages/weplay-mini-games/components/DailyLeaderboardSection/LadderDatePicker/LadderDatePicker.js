import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from 'weplay-components/Icon'

import styles from './LadderDatePicker.scss'

const LadderDatePicker = ({
  text,
  decrementDay,
  incrementDay,
  isStartDate,
  isEndDate,
}) => (
  <div className={styles.block}>
    <button
      type="button"
      className={styles.button}
      onClick={decrementDay}
      disabled={isStartDate}
    >
      <Icon
        iconName="arrow-expand"
        className={classNames(
          styles.icon,
          styles.left,
        )}
      />
    </button>
    <span className={styles.text}>{text}</span>
    <button
      type="button"
      className={styles.button}
      onClick={incrementDay}
      disabled={isEndDate}
    >
      <Icon
        iconName="arrow-expand"
        className={styles.icon}
      />
    </button>
  </div>
)

LadderDatePicker.propTypes = {
  text: PropTypes.string.isRequired,
  decrementDay: PropTypes.func.isRequired,
  incrementDay: PropTypes.func.isRequired,
  isStartDate: PropTypes.bool.isRequired,
  isEndDate: PropTypes.bool.isRequired,
}

export default LadderDatePicker
