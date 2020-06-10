import React from 'react'
import PropTypes from 'prop-types'

import styles from './ProgressLine.scss'

const ProgressLine = ({ value }) => (

  <div className={styles.root}>
    <div
      style={{
        width: `${value}%`,
      }}
      className={styles.progressLine}
    />
  </div>

)

ProgressLine.propTypes = {
  value: PropTypes.number.isRequired,
}

export default React.memo(ProgressLine)
