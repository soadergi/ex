import React from 'react'
import PropTypes from 'prop-types'

import container from './container'
import styles from './styles.scss'

const BetaLabel = ({
  // required props
  text,
  // container props

  // optional props
}) => (
  <span className={styles.block}>
    {text}
  </span>
)

BetaLabel.propTypes = {
  // required props
  text: PropTypes.string.isRequired,
  // container props

  // optional props
}

BetaLabel.defaultProps = {
  // optional props
}

export default container(BetaLabel)
