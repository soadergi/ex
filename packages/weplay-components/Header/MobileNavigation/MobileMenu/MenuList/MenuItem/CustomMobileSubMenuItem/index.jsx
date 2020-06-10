import React from 'react'
import PropTypes from 'prop-types'

import Label from 'weplay-components/Label'

import styles from './styles.scss'

const CustomMobileSubMenuItem = ({
  text,
  labelText,
  labelColor,
}) => (
  <>
    <span className={styles.text}>{text}</span>
    <Label
      color={labelColor}
      className={styles.label}
    >
      {labelText}
    </Label>
  </>
)

CustomMobileSubMenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  labelColor: PropTypes.string.isRequired,

}

export default CustomMobileSubMenuItem
