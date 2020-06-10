import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'

const Connector = ({
  // required props
  isOdd,
  isCollapsed,
  // container props

  // optional props
}) => (
  <div className={classNames(
    styles.connector,
    {
      [styles.isOdd]: isOdd,
      [styles.isCollapsed]: isCollapsed,
    },
  )}
  >
    <div className={styles.path} />
  </div>
)

Connector.propTypes = {
  // required props
  isOdd: PropTypes.bool.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  // container props

  // optional props

}

Connector.defaultProps = {
  // optional props
}

export default Connector
