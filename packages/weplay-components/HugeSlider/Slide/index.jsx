import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Skeleton from 'weplay-components/Skeleton'
import hugeSlidePropType from 'weplay-core/customPropTypes/hugeSlidePropType'
import Link from 'weplay-components/Link'

import container from './container'
import styles from './styles.scss'

const Slide = ({
  // required props
  slide,
  isActive,
  subheader,
  // container props
  backgroundImage,
  // optional props
  isDotsDisabled,
}) => (
  <div className={classNames(
    styles.block,
    {
      [styles.isActive]: isActive,
      [styles.isDotsDisabled]: isDotsDisabled,
    },
  )}
  >
    <div
      className={styles.image}
      style={{ backgroundImage }}
    />

    <div className={styles.header}>
      {slide.title ? (
        <Link
          to={slide.url}
          className={styles.title}
          data-tournament_title={slide.title}
        >
          {slide.title}
        </Link>
      )
        : <Skeleton width="3500px" />}
      {subheader && subheader({ slide })}
    </div>
  </div>
)

Slide.propTypes = {
  // required props
  isActive: PropTypes.bool.isRequired,
  subheader: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]).isRequired,
  // container props
  slide: hugeSlidePropType.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  // optional props
  isDotsDisabled: PropTypes.bool,
}

Slide.defaultProps = {
  // optional props
  isDotsDisabled: false,
}

export default container(Slide)
