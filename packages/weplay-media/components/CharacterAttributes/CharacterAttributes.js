import React from 'react'

import CharacterAttribute from './CharacterAttribute/CharacterAttribute'
import styles from './CharacterAttributes.scss'

const main = [
  {
    id: 1,
    image: 'https://static-prod.weplay.tv/2020-05-05/894cd51667d7dad8fd2b62fcf0573603.E40C2C-E80C2C-E80C2C.png',
    value: '22',
    rise: '+3.7',
  },
  {
    id: 2,
    image: 'https://static-prod.weplay.tv/2020-05-05/60d8e4163a416c0ca996ca54aa7f7581.2CC474-24C974-2CCC74.png',
    value: '22',
    rise: '+3.7',
  },
  {
    id: 3,
    image: 'https://static-prod.weplay.tv/2020-05-05/5e44df4df11118a938606a4536f22962.14A4E4-18A4E4-18A4E4.png',
    value: '22',
    rise: '+3.7',
  },
]

const CharacterAttributes = () => (
  <div className={styles.block}>
    {main.map(сharacter => (
      <CharacterAttribute
        key={сharacter.id}
        сharacter={сharacter}
      />
    ))}
  </div>
)

export default CharacterAttributes
