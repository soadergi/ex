import React from 'react'
import PropTypes from 'prop-types'

import WrapperWithCaption from '../WrapperWithCaption'
import SingleImage from '../SingleImage/SingleImage'
import ImageGallery from '../ImageGallery/ImageGallery'

import styles from './ImageBlock.scss'

const ImageBlock = ({
  images,
}) => (
  <div className={styles.block}>
    {images.length === 1 && (
      <WrapperWithCaption text={images[0].caption}>
        <SingleImage image={images[0]} />
      </WrapperWithCaption>
    )}

    {images.length > 1 && (
      <ImageGallery images={images} />
    )}
  </div>
)

ImageBlock.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    caption: PropTypes.string,
  })).isRequired,
}

export default ImageBlock
