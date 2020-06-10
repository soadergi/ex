import React from 'react'
import PropTypes from 'prop-types'
import BackgroundImg from 'weplay-components/BackgroundImg'

import container from './container'
import styles from './styles.scss'
import img from './img/feature-img.jpg'

const FeatureSection = ({
  children,
}) => (
  <div className={styles.block}>
    <div className={styles.imgWrap}>
      <BackgroundImg
        src={img}
      />
    </div>
    <div className={styles.contentWrap}>
      {children}
    </div>
  </div>
)

FeatureSection.propTypes = {
  // required props
  // container props
  // optional props
  children: PropTypes.node,
}

FeatureSection.defaultProps = {
  // optional props
  children: null,
}

export default container(FeatureSection)
