import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ImageZoom from 'react-medium-image-zoom'

import styles from './SlideItem.scss'

const SlideItem = ({
  // required props
  photos,
  isEven,
  // container props

  // optional props
}) => (
  <div className={classNames(
    styles.block,
    { [styles.isEven]: isEven },
  )}
  >
    {photos.map(photo => (
      <div
        key={photo}
        className={styles.imgWrap}
      >
        <ImageZoom
          image={{
            src: photo,
            alt: '',
          }}
        />
      </div>
    ))}
  </div>
)

SlideItem.propTypes = {
  // required props
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  isEven: PropTypes.bool.isRequired,

  // container props

  // optional props
}

SlideItem.defaultProps = {
  // optional props
}

export default React.memo(SlideItem)
