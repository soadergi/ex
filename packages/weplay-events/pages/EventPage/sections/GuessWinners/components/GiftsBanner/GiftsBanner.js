import React from 'react'
import PropTypes from 'prop-types'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import Image from 'weplay-components/Image'

import styles from './GiftsBanner.scss'

const GiftsBanner = ({
  title,
  description,
  imageSrc,
}) => (
  <div className={styles.block}>
    <ContentContainer>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>

        <p className={styles.description}>{description}</p>

        {imageSrc && (
          <Image
            className={styles.image}
            src={imageSrc}
          />
        )}
      </div>
    </ContentContainer>
  </div>
)

GiftsBanner.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageSrc: PropTypes.string,
}

GiftsBanner.defaultProps = {
  title: '',
  description: '',
  imageSrc: '',
}

export default GiftsBanner
