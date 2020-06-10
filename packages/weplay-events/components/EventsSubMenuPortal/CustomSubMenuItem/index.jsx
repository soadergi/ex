import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'weplay-components/Icon'
import Label from 'weplay-components/Label'

import styles from './styles.scss'

const CustomSubMenuItem = ({
  text,
  labelText,
  iconName,
  labelColor,
}) => (
  <>
    {iconName && (
      <Icon
        iconName={iconName}
        className={styles.icon}
      />
    )}
    <span>{text}</span>
    <Label
      color={labelColor}
      className={styles.label}
    >
      {labelText}
    </Label>
  </>
)

CustomSubMenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  labelColor: PropTypes.string.isRequired,
  iconName: PropTypes.string,
}

CustomSubMenuItem.defaultProps = {
  iconName: '',
}

export default CustomSubMenuItem
