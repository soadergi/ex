import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'
import container from './container'

const DefaultFirstPlacePrize = ({
  label,
  sum,
}) => (
  <li className={styles.prize}>
    <span className={styles.label}>
      {label}
    </span>
    <span className={styles.sum}>{`${sum}$`}</span>
  </li>
)

DefaultFirstPlacePrize.propTypes = {
  label: PropTypes.string.isRequired,
  sum: PropTypes.string,
}
DefaultFirstPlacePrize.defaultProps = {
  sum: '',
}

export default container(DefaultFirstPlacePrize)
