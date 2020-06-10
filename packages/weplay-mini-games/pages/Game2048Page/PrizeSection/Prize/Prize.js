import React from 'react'

import Image from 'weplay-components/Image'

import styles from './Prize.scss'
import imageUrl from './img/prize.png'

const Prize = () => (
  <figure className={styles.block}>
    <Image
      src={imageUrl}
      alt="prize"
      className={styles.image}
    />
  </figure>
)

export default Prize
