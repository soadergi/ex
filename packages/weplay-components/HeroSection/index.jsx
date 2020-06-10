import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import hexToGradient from 'weplay-core/helpers/hexToGradient'

import styles from './styles.scss'

const HeroSection = ({
  image,
  bgColor,
  children,
  className,
}) => (
  <div
    className={classNames(
      styles.block,
      className,
      {
        [styles.color]: !image,
      },
    )}
    style={
        image
          ? { backgroundImage: `url(${image})` }
          : { background: hexToGradient(bgColor) }
      }
  >
    <div className={styles.wrap}>
      {children}
    </div>
  </div>
)

HeroSection.propTypes = {
  image: PropTypes.string,
  bgColor: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
}

HeroSection.defaultProps = {
  image: '',
  bgColor: '',
  children: null,
  className: '',
}

export default HeroSection
