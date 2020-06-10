import React from 'react'
import BackgroundFullWidth from 'weplay-components/BackgroundFullWidth'
import Icon from 'weplay-components/Icon'
import ShareBlock from 'weplay-components/ShareBlock/ShareBlock'

import bannerLogo from './img/bg.jpg'
import styles from './styles.scss'

const AdvertisementBanner = ({
  // required props

  // container props

  // optional props
}) => (
  <div className={styles.block}>
    <div className={styles.wrap}>
      <BackgroundFullWidth
        className={styles.backgroundImage}
        src={bannerLogo}
        alt=""
      />

      <Icon
        className={styles.icon}
        iconName="weplay"
      />

      <span className={styles.title}>We have to update some things here...</span>

      <span className={styles.description}>
        WePlay! website will be available in less then a minute. Try reloading your page in around 10 seconds.
        You can check our social pages in the meantime
      </span>

      <ShareBlock
        className={styles.share}
        color="blue"
        url="/"
      />
    </div>
  </div>
)

AdvertisementBanner.propTypes = {
  // required props

  // container props

  // optional props
}

export default AdvertisementBanner
