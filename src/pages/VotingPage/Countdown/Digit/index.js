import React from 'react'
import PropTypes from 'prop-types'
import { pure } from 'recompose'
import classNames from 'classnames'

import styles from './styles.scss'

const Digit = ({
  text,
  value,
  hasStage2,
}) => (
  <div className={
     classNames(
       styles.digit,
       {
         [styles.hasStage2]: hasStage2,
       },
     )
   }
  >
    <div className={styles.tile}>
      <span className={styles.number}>{value}</span>
      <span className={styles.label}>{text}</span>
    </div>
  </div>
)


Digit.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])).isRequired,
  hasStage2: PropTypes.bool,
}

Digit.defaultProps = {
  hasStage2: true,
}

export default pure(Digit)
