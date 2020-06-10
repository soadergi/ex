import React from 'react'
import SvgIcon from 'weplay-components/SvgIcon'

import styles from './styles.scss'

const CoinFlip = () => (
  <span className={styles.block}>
    <SvgIcon
      iconName="goldenCoin"
      type="color"
      className={styles.coin}
    />
  </span>
)

export default CoinFlip
