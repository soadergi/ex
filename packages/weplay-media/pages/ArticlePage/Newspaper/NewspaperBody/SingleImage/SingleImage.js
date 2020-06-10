import React from 'react'
import PropTypes from 'prop-types'

import ImageScale from '../../components/ImageScale/ImageScale'

const SingleImage = ({ image }) => {
  const src = image.media?.path ?? ''
  const alt = image.media?.attributes?.alt ?? ''

  return (
    <ImageScale
      imageSrc={src}
      imageAlt={alt}
      className="o-img-responsive u-mx-auto"
    />
  )
}

SingleImage.propTypes = {
  image: PropTypes.shape({
    media: PropTypes.shape({}),
  }).isRequired,
}

export default SingleImage
