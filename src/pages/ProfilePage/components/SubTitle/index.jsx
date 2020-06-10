import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'

const SubTitle = ({
  // required props
  text,
  // container props

  // optional props
}) => (
  <p className={styles.block}>
    {text}
  </p>
)

SubTitle.propTypes = {
  // required props
  text: PropTypes.string.isRequired,
  // container props

  // optional props
}

SubTitle.defaultProps = {
  // optional props
}

export default SubTitle
