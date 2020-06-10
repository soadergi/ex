import React from 'react'

import CharacterItem from './CharacterItem/CharacterItem'
import styles from './CharactersList.scss'

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
  {
    link: '/',
    image: 'https://static-prod.weplay.tv/2020-04-30/820ba047e92fa31a2f21542f8721ac07.301C20-A39271-735F81.png',
    name: 'Centauur Warrunn',
  },
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
  {
    link: '/',
    image: 'https://static-prod.weplay.tv/2020-04-30/820ba047e92fa31a2f21542f8721ac07.301C20-A39271-735F81.png',
    name: 'Centauur Warrunn',
  },
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
  {
    link: '/',
    image: 'https://static-prod.weplay.tv/2020-04-30/820ba047e92fa31a2f21542f8721ac07.301C20-A39271-735F81.png',
    name: 'Centauur Warrunn',
  },
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
  {
    link: '/',
    image: 'https://static-prod.weplay.tv/2020-04-30/820ba047e92fa31a2f21542f8721ac07.301C20-A39271-735F81.png',
    name: 'Centauur Warrunn',
  },
]

const CharactersList = () => (
  <div className={styles.list}>
    {list.map(сharacter => (
      <CharacterItem
        key={сharacter.name}
        сharacter={сharacter}
      />
    ))}
  </div>
)

export default React.memo(CharactersList)
