import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'

const HeadButton = ({
  // required props
  onClick,
  // optional props
  text,
  ...props
}) => (
  <button
    className={styles.block}
    onClick={onClick}
    type="button"
    {...props}
  >
    {text}
  </button>

)

HeadButton.propTypes = {
  // required props
  onClick: PropTypes.func.isRequired,
  // optional props
  text: PropTypes.string,
}

HeadButton.defaultProps = {
  // optional props
  text: '',
}

export default (HeadButton)
