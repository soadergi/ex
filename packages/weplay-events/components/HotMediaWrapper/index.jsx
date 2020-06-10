import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'
import container from './container'

const HotMediaWrapper = ({
  // required props
  children,
}) => (
  <div className={styles.hotMediaWrapper}>
    {children}
  </div>
)

HotMediaWrapper.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
}
HotMediaWrapper.defaultProps = {
}

export default container(HotMediaWrapper)
