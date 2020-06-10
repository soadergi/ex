import React from 'react'
import PropTypes from 'prop-types'

import container from './container'
import styles from './styles.scss'

const HeroSection = ({ children }) => (
  <div className={styles.block}>
    {children}
  </div>
)

HeroSection.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
  // container props
  // optional props
}

HeroSection.defaultProps = {
  // optional props
}

export default container(HeroSection)
