import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'

import styles from './styles.scss'

const ListPoolLabel = ({
  // required props
  text,
  // container props

  // optional props
  isSuccess,
}) => (
  <p className={styles.label}>
    <Icon
      className={classNames(
        styles.icon,
        {
          [styles.isSuccess]: isSuccess,
        },
      )}
      iconName={isSuccess ? 'check' : 'close'}
    />
    {text}
  </p>
)

ListPoolLabel.propTypes = {
  // required props
  text: PropTypes.string.isRequired,
  // container props

  // optional props
  isSuccess: PropTypes.bool,
}

ListPoolLabel.defaultProps = {
  // optional props
  isSuccess: false,
}

export default ListPoolLabel
