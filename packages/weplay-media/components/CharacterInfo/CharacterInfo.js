import React from 'react'
import { useSelector } from 'react-redux'

import { isTabletWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import Avatar from 'weplay-components/Avatar'
import Image from 'weplay-components/Image'
import BackgroundImg from 'weplay-components/BackgroundImg'

import CharacterAttributes from 'weplay-media/components/CharacterAttributes/CharacterAttributes'

import styles from './CharacterInfo.scss'

const bg = 'https://static-prod.weplay.tv/2020-05-04/756a8c094c1fdbcbf97db5797f29cb1a.png'
const hero = 'https://static-prod.weplay.tv/2020-05-04/e8a4c4dfb1678c65a4d8618825b7957c.301C20-A29170-75607C.png'

const CharacterInfo = () => {
  const isTabletWidth = useSelector(isTabletWidthSelector)
  return (
    <div className={styles.block}>
      <div className={styles.content}>
        <div className={styles.name}>
          <Avatar
            className={styles.avatar}
            size="48"
          />
          <h1 className={styles.title}>Earthshaker</h1>
        </div>
        <div className={styles.wrap}>
          <span className={styles.atack}>Melee</span>
          <ul className={styles.roles}>
            <li className={styles.role}>Support</li>
            <li className={styles.role}>Initiator</li>
            <li className={styles.role}>Disabler</li>
            <li className={styles.role}>Nuker</li>
          </ul>
        </div>
        <ul className={styles.rates}>
          <li className={styles.rate}>
            <span className={styles.label}>Pick rate</span>
            15.5%
          </li>
          <li className={styles.rate}>
            <span className={styles.label}>Ban rate</span>
            15.5%
          </li>
          <li className={styles.rate}>
            <span className={styles.label}>Win rate</span>
            15.5%
          </li>
        </ul>
        <CharacterAttributes />
        <CharacterAttributes />
      </div>
      {!isTabletWidth && (
        <div className={styles.image}>
          <Image
            className={styles.hero}
            src={hero}
          />
          <BackgroundImg
            className={styles.bg}
            src={bg}
          />
        </div>
      )}
    </div>
  )
}

export default CharacterInfo
