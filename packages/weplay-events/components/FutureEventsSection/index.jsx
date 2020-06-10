import React from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'

import container from './container'
import styles from './styles.scss'

const FeatureSection = ({
  children,
  isMobileWidth,
}) => (
  <div className={styles.block}>
    <Scrollbars
      autoHeight
      autoHeightMin={620}
      autoHeightMax={isMobileWidth ? 1210 : 1080}
    >
      <div className={styles.wrap}>
        {children}
      </div>
    </Scrollbars>
  </div>
)

FeatureSection.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
  isMobileWidth: PropTypes.bool.isRequired,
  // container props
  // optional props
}

FeatureSection.defaultProps = {
  // optional props
}

export default container(FeatureSection)
