import React from 'react'

import Section, { PADDING_Y } from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import HeadLine from 'weplay-components/HeadLine'
import ImageSlider from 'weplay-components/ImageSlider/ImageSlider'

import classes from '../styles.scss'

const GalleryBlock = ({ whatToExpectBlock }) => {
  const galleryImages = whatToExpectBlock.images.map(image => image.path)

  return (
    <Section paddingY={PADDING_Y.SM}>
      <ContentContainer>
        <HeadLine title={whatToExpectBlock.title} />
        <p className={classes.text}>{whatToExpectBlock.description}</p>
      </ContentContainer>
      <ImageSlider images={galleryImages} />
    </Section>
  )
}

export default GalleryBlock
