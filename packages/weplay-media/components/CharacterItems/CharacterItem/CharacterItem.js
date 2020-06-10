import React from 'react'

import Image from 'weplay-components/Image'

import styles from './CharacterItem.scss'

const image = 'https://static-prod.weplay.tv/2020-05-19/f8d94c8dc98fe7e7d70d92ef36a4d261.4AAA29-12200F-9DF9C5.png'
const image2 = 'https://static-prod.weplay.tv/2020-05-19/dc52e456b7b0f0d8555216e8f4ee8f4b.082B34-A4CEC9-748C80.png'

const CharacterItem = () => (
  <div className={styles.block}>
    <p className={styles.title}>Starting items</p>
    <div className={styles.items}>
      <div className={styles.item}>
        <Image
          className={styles.image}
          src={image}
        />
        <p className="u-mb-1">Tango</p>
      </div>
      <div className={styles.item}>
        <Image
          className={styles.image}
          src={image2}
        />
        <p className="u-mb-1">Clarity</p>
      </div>
    </div>
  </div>
)

export default CharacterItem
