import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Icon from 'weplay-components/Icon'
import Slider from 'weplay-components/Slider/loadable'

import WrapperWithCaption from '../WrapperWithCaption'

import styles from './ImageGallery.scss'
import Arrow from './Arrow'

const ImageGallery = ({
  // required props
  images,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const t = useTranslation()

  const headerText = t('mediaCore.articlePage.imageGallery.count', {
    current: currentSlide + 1,
    overall: images.length,
  })

  const caption = images[currentSlide].caption || images[0].caption

  const handleSlideChange = useCallback(nextSlideIndex => setCurrentSlide(nextSlideIndex), [setCurrentSlide])

  return (
    <WrapperWithCaption text={caption}>
      <div className={styles.header}>
        <span className={styles.text}>
          {headerText}
        </span>
        <Icon
          iconName="gallery"
          size="small"
        />
      </div>
      <Slider
        prevArrow={<Arrow isLeft />}
        nextArrow={<Arrow />}
        afterChange={handleSlideChange}
      >
        {images.map(image => (
          <img
            key={image.media.mediaId}
            className="o-img-responsive u-mx-auto"
            alt={image.media.attributes.alt}
            src={image.media.path}
          />
        ))}
      </Slider>
    </WrapperWithCaption>
  )
}

ImageGallery.propTypes = {
  // required props
  images: PropTypes.arrayOf(PropTypes.shape({
    caption: PropTypes.string,
  })).isRequired,
}

export default React.memo(ImageGallery)
