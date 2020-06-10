import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'
import container from './container'

const Prize = ({
  label,
  sum,
}) => (
  <li className={styles.prize}>
    <span className={styles.label}>{label}</span>
    <span className={styles.sum}>{`${sum}$`}</span>
  </li>
)

Prize.propTypes = {
  label: PropTypes.string.isRequired,
  sum: PropTypes.string,
}
Prize.defaultProps = {
  sum: '',
}

export default container(Prize)
