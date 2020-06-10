import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import container from './container'
import styles from './styles.scss'

const SliderDots = ({
  // required props
  title,
  dotsList,
  activeDot,
  // container props
  // optional props
}) => (
  <div className={styles.block}>
    <div className={styles.header}>
      {title && (
        <p className={styles.title}>{title}</p>
      )}

      <ul className={styles.dots}>
        {dotsList.map((dot, index) => (
          <li
            key={dot.key}
            className={classNames(
              styles.dot,
              { [styles.isActive]: activeDot === index },
            )}
          />
        ))}
      </ul>
    </div>

    <div className={styles.navigationContainer}>
      <ul
        className={styles.navigation}
      >
        {dotsList}
      </ul>
    </div>
  </div>
)

SliderDots.propTypes = {
  // required props
  title: PropTypes.string.isRequired,
  dotsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  activeDot: PropTypes.number.isRequired,
  // container props
}

export default container(SliderDots)
