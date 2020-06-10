import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import CharacterItem from 'weplay-media/components/CharactersList/CharacterItem/CharacterItem'

import styles from './CharacterPicks.scss'

const list = [
  {
    link: '/',
    image: 'https://static-prod.weplay.tv/2020-04-30/b6a790ef7bc2c223c9eb8d97189821c8.452B28-D5D0CA-9EA4AE.jpeg',
    name: 'Eartshaker',
  },
  {
    link: '/',
    image: 'https://static-prod.weplay.tv/2020-04-30/cace76e61f6bbf978215d7d0f4d74035.342931-B36F5D-787784.jpeg',
    name: 'Axe',
  },
  {
    link: '/',
    image: 'https://static-prod.weplay.tv/2020-04-30/f5842c7991aa039c178a7eb932683a33.43383A-B594CB-AC725F.jpeg',
    name: 'Alchemist',
  },
]
const CharacterPicks = () => {
  const t = useTranslation()
  return (
    <div>
      <h3 className={styles.title}>{t('mediaCore.character.overview.picks.title')}</h3>
      <p className={styles.pick}>Bad Against</p>
      <div className={styles.list}>
        {list.map(сharacter => (
          <CharacterItem
            key={сharacter.name}
            сharacter={сharacter}
          />
        ))}
      </div>
      <p className={styles.pick}>Good Against</p>
      <div className={styles.list}>
        {list.map(сharacter => (
          <CharacterItem
            key={сharacter.name}
            сharacter={сharacter}
          />
        ))}
      </div>
      <p className={styles.pick}>Works well with</p>
      <div className={styles.list}>
        {list.map(сharacter => (
          <CharacterItem
            key={сharacter.name}
            сharacter={сharacter}
          />
        ))}
      </div>
    </div>
  )
}

export default CharacterPicks
