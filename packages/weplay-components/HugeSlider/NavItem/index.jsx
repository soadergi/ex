import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Skeleton from 'weplay-components/Skeleton'
import hugeSlidePropType from 'weplay-core/customPropTypes/hugeSlidePropType'
import Image from 'weplay-components/Image'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'

import container from './container'
import styles from './styles.scss'

const NavItem = ({
  // required props
  control,
  isActive,
  // container props
  circleRadius,
  circleLength,
  // optional props
}) => (
  <div
    className={classNames(
      styles.block,
      { [styles.isActive]: isActive },
    )}
    {...getAnalyticsAttributes({
      action: 'event click',
      label: control.title,
      category: LOOKUP,
    })}
  >
    <div className={styles.imageWrapper}>
      <figure className={styles.figure}>
        {control.images.preview ? (
          <Image
            src={control.images.preview}
            alt={control.title}
            className="o-img-responsive"
          />
        ) : (
          <Skeleton
            circle
            width="55px"
            height="55px"
          />
        )}
      </figure>

      <svg
        viewBox="0 0 68 68"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.border}
      >
        <circle
          cx="34"
          cy="34"
          r={circleRadius}
          className={styles.circle}
          style={{ '--stroke-length': circleLength }}
        />
      </svg>
    </div>

    <p className={styles.title}>{control.title}</p>
  </div>
)

NavItem.propTypes = {
  // required props
  control: hugeSlidePropType.isRequired,
  isActive: PropTypes.bool.isRequired,
  // container props
  circleRadius: PropTypes.number.isRequired,
  circleLength: PropTypes.number.isRequired,
}

export default container(NavItem)
