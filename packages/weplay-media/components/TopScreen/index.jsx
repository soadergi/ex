import PropTypes from 'prop-types'
import React from 'react'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import HeroSection from 'weplay-components/HeroSection'
import Breadcrumbs from 'weplay-components/Breadcrumbs'
import Image from 'weplay-components/Image'
import ListingTitle from 'weplay-media/components/ListingTitle'

import styles from './styles.scss'

const TopScreen = ({
  bgImage,
  bgColor,
  entityName,
  stickerSrc,
  stickerAlt,
  title,
  text,
  handleClick,
  listingTitle,
  modifier,
}) => (
  <HeroSection
    image={bgImage}
    bgColor={bgColor}
  >
    <ContentContainer>
      <Breadcrumbs
        entityName={entityName}
        isWhite
      />
    </ContentContainer>
    <div className={styles.container}>
      { listingTitle && (
        <ListingTitle
          handleClick={handleClick}
          title={listingTitle}
          modifier={modifier}
        />
      )}
      { stickerSrc && (
      <div className={styles.sticker}>
        <Image
          className="o-img-responsive"
          src={stickerSrc}
          alt={stickerAlt}
        />
      </div>
      )}
      { title && (
      <h1 className={styles.title}>{title}</h1>
      )}
      { text && (
      <p className={styles.text}>{text}</p>
      )}
    </div>
  </HeroSection>
)

TopScreen.propTypes = {
  bgImage: PropTypes.string,
  bgColor: PropTypes.string,
  entityName: PropTypes.string,
  stickerSrc: PropTypes.string,
  stickerAlt: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  listingTitle: PropTypes.string,
  handleClick: PropTypes.func,
  modifier: PropTypes.string,
}

TopScreen.defaultProps = {
  bgImage: '',
  bgColor: '',
  entityName: '',
  stickerSrc: '',
  stickerAlt: '',
  title: '',
  text: '',
  handleClick: null,
  modifier: '',
  listingTitle: '',
}

export default TopScreen
