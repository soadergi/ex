import React, { useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ImageZoom from 'react-medium-image-zoom'

import { style } from './constants'

const ImageScale = ({
  imageSrc,
  imageAlt,
  className,
}) => {
  const imageProps = useMemo(() => ({
    src: imageSrc,
    alt: imageAlt,
    className: classNames(className, 'o-img-responsive'),
  }))

  return (
    <ImageZoom
      image={imageProps}
      defaultStyles={style}
      zoomMargin={0}
      shouldRespectMaxDimension
    />
  )
}

ImageScale.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  className: PropTypes.string,
}

ImageScale.defaultProps = {
  imageAlt: '',
  className: '',
}

export default ImageScale
