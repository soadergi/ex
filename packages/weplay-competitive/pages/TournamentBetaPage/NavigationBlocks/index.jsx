import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'

const BottomHeroSection = ({
  title,
  isInView,
}) => (
  <div className={classNames(
    styles.block,
    {
      [styles.isInView]: isInView,
    },
  )}
  >
    {title}
  </div>
)

BottomHeroSection.propTypes = {
  // required props
  title: PropTypes.string.isRequired,
  // container props

  // optional props
  isInView: PropTypes.bool,
}

BottomHeroSection.defaultProps = {
  // optional props
  isInView: false,
}

export default BottomHeroSection
