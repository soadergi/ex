import React from 'react'

import PageSectionTitle from 'weplay-components/PageSectionTitle'

import SubTitle from '../components/SubTitle'
import AddSteam from '../components/AddSteam'
import Games from '../components/Games'

import styles from './styles.scss'

const GameSettings = () => (
  <div className={styles.block}>
    <PageSectionTitle
      text="Game settings"
    />
    <SubTitle
      text="To add games connect your Steam account first"
    />
    <div className={styles.content}>
      <AddSteam />
      <Games />
    </div>
  </div>
)

export default GameSettings
