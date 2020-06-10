import React from 'react'
import PropTypes from 'prop-types'

import container from './container'
import styles from './styles.scss'

const ContentContainer = ({
  // required props
  children,

  // container props

  // optional props
  ...props
}) => (
  <div
    className={styles.block}
    {...props}
  >
    {children}
  </div>
)

ContentContainer.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
  // container props

  // optional props
}

ContentContainer.defaultProps = {
  // optional props
}

export default container(ContentContainer)
