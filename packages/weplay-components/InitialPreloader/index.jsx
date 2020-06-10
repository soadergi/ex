import React from 'react'
import Logo from 'weplay-components/Logo'

import styles from './styles.scss'

const InitialPreloader = () => (
  <div className={styles.block}>
    <div className={styles.logo}>
      <Logo isFluid />
    </div>
  </div>
)

export default InitialPreloader
