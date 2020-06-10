import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import lobbyMapPropType from 'weplay-competitive/customPropTypes/lobbyMapPropType'
import matchParticipantPropType from 'weplay-competitive/customPropTypes/matchParticipantPropType'

import container from './container'
import TimelineItem from './TimelineItem'
import styles from './styles.scss'

const Timeline = ({
  // required props
  homeParticipant,
  awayParticipant,
  matchPlayer1Id,
  currentLobbyMap,
  // container props
  lobbyMaps,
  // optional props
}) => {
  const t = useTranslation()

  return lobbyMaps.length && (
  <div className={styles.block}>
    <p className={styles.title}>
      {t('competitive.match.mapVoting.sequence')}
    </p>
    <ul className={styles.list}>
      {lobbyMaps.map(lobbyMap => (
        <TimelineItem
          key={lobbyMap.id}
          lobbyMap={lobbyMap}
          currentLobbyMap={currentLobbyMap}
          homeParticipant={homeParticipant}
          awayParticipant={awayParticipant}
          matchPlayer1Id={matchPlayer1Id}
        />
      ))}
    </ul>
  </div>
  )
}

Timeline.propTypes = {
  // required props
  // container props
  lobbyMaps: PropTypes.arrayOf(
    lobbyMapPropType.isRequired,
  ).isRequired,
  homeParticipant: matchParticipantPropType.isRequired,
  awayParticipant: matchParticipantPropType.isRequired,
  matchPlayer1Id: PropTypes.number.isRequired,
  currentLobbyMap: lobbyMapPropType.isRequired,
  // optional props

}

Timeline.defaultProps = {
  // optional props
}

export default container(Timeline)
