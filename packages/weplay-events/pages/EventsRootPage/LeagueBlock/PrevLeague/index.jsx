import React from 'react'
import Image from 'weplay-components/Image'
import i18nTextsPropType from 'weplay-core/customPropTypes/i18nTextsPropType'

import { WINNER_LOGO_URL } from '../constants'

import backgroundImg from './img/cup.png'
import container from './container'
import styles from './styles.scss'

const PrevLeague = ({
  // required props

  // container props
  i18nTexts,
  // optional props
}) => (
  <div className={styles.block}>
    <Image
      className={styles.backgroundImage}
      src={backgroundImg}
      alt=""
    />
    <div className={styles.content}>
      <Image
        className={styles.teamLogo}
        src={WINNER_LOGO_URL}
        alt=""
      />
      <h3 className={styles.title}>{i18nTexts.events.eventsRootPage.leagueBlock.previousLeague.title}</h3>
      <p className={styles.text}>{i18nTexts.events.eventsRootPage.leagueBlock.previousLeague.text}</p>
      <p className={styles.prize}>{i18nTexts.events.eventsRootPage.leagueBlock.previousLeague.prize}</p>
    </div>
  </div>

)

PrevLeague.propTypes = {
  // required props
  i18nTexts: i18nTextsPropType.isRequired,
  // container props
  // optional props
}

PrevLeague.defaultProps = {
  // optional props
}

export default container(PrevLeague)
