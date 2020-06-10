import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './TimeResult.scss'

const TimeResult = ({
  name,
  time,
  className,
  isHighlighted,
}) => (
  <div className={classNames(styles.block, className)}>
    <div className={styles.name}>{name}</div>
    <div className={classNames(
      styles.time,
      isHighlighted && styles.highlighted,
    )}
    >
      {time}
    </div>
  </div>
)

TimeResult.propTypes = {
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  className: PropTypes.string,
  isHighlighted: PropTypes.bool,
}

TimeResult.defaultProps = {
  className: '',
  isHighlighted: false,
}

export default React.memo(TimeResult)
