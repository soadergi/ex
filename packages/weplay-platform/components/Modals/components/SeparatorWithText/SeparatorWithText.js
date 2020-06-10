import React from 'react'
import PropTypes from 'prop-types'

import styles from './SeparatorWithText.scss'

const SeparatorWithText = ({
  text,
}) => (
  <p className={styles.block}>
    <span className={styles.title}>{text}</span>
  </p>
)

SeparatorWithText.propTypes = {
  text: PropTypes.string.isRequired,
}

export default SeparatorWithText
