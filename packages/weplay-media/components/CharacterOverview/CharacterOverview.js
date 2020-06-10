import React from 'react'

import CharacterOverall from './CharacterOverall/CharacterOverall'
import CharacterPicks from './CharacterPicks/CharacterPicks'
import styles from './CharacterOverview.scss'

const CharacterOverview = () => (
  <div className={styles.block}>
    <CharacterOverall />
    <CharacterPicks />
  </div>
)

export default CharacterOverview
