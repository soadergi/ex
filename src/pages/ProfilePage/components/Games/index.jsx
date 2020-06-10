import React from 'react'

import PageSectionTitle from 'weplay-components/PageSectionTitle'

import SubTitle from '../SubTitle'
import GameItem from '../GameItem'

import styles from './styles.scss'

const data = [
  {
    game: 'Dota2',
    iconName: 'dota2',
    isAdded: true,
    isDisabled: false,
    errorMessage: 'Error message',
  },
  {
    game: 'Doka2',
    iconName: 'dota2',
    isAdded: true,
    isDisabled: false,
    errorMessage: '',
  },
  {
    game: 'CS:GO',
    iconName: 'cs-go',
    isAdded: false,
    isDisabled: true,
    errorMessage: '',
  },
  {
    game: 'CS:1.6',
    iconName: 'cs-go',
    isAdded: false,
    isDisabled: false,
    errorMessage: 'Error message',
  },
]

const Games = () => (
  <div>
    <PageSectionTitle
      className={styles.title}
      iconName="gamepad"
      text="Games"
    />
    <SubTitle
      text="Your Steam privacy settings must be public. Games must be added to your Steam library."
    />
    <div className={styles.content}>
      {data.map(item => (
        <GameItem
          key={item.game}
          game={item.game}
          iconName={item.iconName}
          isAdded={item.isAdded}
          isDisabled={item.isDisabled}
          errorMessage={item.errorMessage}
        />
      ))}
    </div>
  </div>

)

export default Games
