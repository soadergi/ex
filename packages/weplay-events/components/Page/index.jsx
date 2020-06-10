import React from 'react'
import PropTypes from 'prop-types'

import container from './container'
import styles from './styles.scss'

const Page = ({
  // required props
  children,
  // container props
  // optional props
}) => (
  <div className={styles.page}>
    {children}
  </div>
)

Page.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
  // container props
  // optional props
}

Page.defaultProps = {
  // optional props
}

export default container(Page)
