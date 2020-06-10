import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'
import container from './container'

const Body = ({
  // required props
  children,

  // container props

  // optional props
}) => (
  <div
    className={styles.body}
  >
    <div className={classNames(
      styles.container,
    )}
    >
      {children}
    </div>
  </div>
)

Body.propTypes = {
  // required props
  children: PropTypes.node.isRequired,

  // container props

  // optional props
}

export default container(Body)
