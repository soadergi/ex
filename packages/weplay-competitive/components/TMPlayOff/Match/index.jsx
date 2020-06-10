import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import transliterate from 'weplay-core/helpers/translit'
import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'
import { AT__LOBBY_VIEW } from 'weplay-competitive/analytics/amplitude'

import Participant from '../Participant'
import { ActiveParticipantContext } from '../active-participant-context'

import styles from './styles.scss'
import container from './container'

const Match = ({
  // required props
  game,

  // container props
  participantA,
  participantB,
  isGameInProgress,
  isGameFinished,
  isGameSheduled,
  isGameCanceled,
  isMatchTechnicalEnded,
  handleClickViewLobby,
  discipline,

  // optional props
  isFinalMatch,
  isThirdPlaceMatch,
}) => (
  <ActiveParticipantContext.Consumer>
    {({
      hoveredParticipantId,
      setHoveredParticipantId,
    }) => (
      <div className={classNames(
        styles.match,
        {
          [styles.isGreenBorder]: isGameInProgress,
          [styles.isRedBorder]: isGameCanceled,
        },
      )}
      >
        <Participant
          className={styles.participant}
          participant={participantA}
          isWinner={participantA && participantB ? participantA.score > participantB.score : false}
          isFinalMatch={isFinalMatch}
          isGameSheduled={isGameSheduled}
          isGameFinished={isGameFinished}
          isThirdPlaceMatch={isThirdPlaceMatch}
          hoveredParticipantId={hoveredParticipantId}
          setHoveredParticipantId={setHoveredParticipantId}
          isMatchTechnicalEnded={isMatchTechnicalEnded}
        />

        <Participant
          className={styles.participant}
          participant={participantB}
          isWinner={participantA && participantB ? participantA.score < participantB.score : false}
          isFinalMatch={isFinalMatch}
          isGameSheduled={isGameSheduled}
          isGameFinished={isGameFinished}
          isThirdPlaceMatch={isThirdPlaceMatch}
          hoveredParticipantId={hoveredParticipantId}
          setHoveredParticipantId={setHoveredParticipantId}
          isMatchTechnicalEnded={isMatchTechnicalEnded}
        />

        <div className={styles.meta}>
          {game.isLobbyReady
            ? (
              <Link
                target="_blank"
                className={styles.link}
                to={pathWithParamsByRoute(
                  NAMES.MATCH,
                  {
                    tournamentId: game.tournamentId,
                    tournamentName: transliterate(game.tournamentName),
                    matchId: game.matchId,
                    discipline: game.discipline,
                  },
                )}
                onClick={handleClickViewLobby}
                {...getAnalyticsAttributes({
                  'amplitude-action': AT__LOBBY_VIEW,
                  'amplitude-source': LOOKUP,
                  'amplitude-discipline': discipline,
                })}
              >
                <Icon iconName="arrow-right" />
              </Link>
            )
            : (
              <Icon iconName="arrow-right" />
            )}
        </div>
      </div>
    )}
  </ActiveParticipantContext.Consumer>
)

Match.propTypes = {
  // required props
  game: PropTypes.shape({
    isLobbyReady: PropTypes.bool.isRequired,
    tournamentId: PropTypes.number.isRequired,
    matchId: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    discipline: PropTypes.string.isRequired,
    tournamentName: PropTypes.string.isRequired,
    startDatetime: PropTypes.string.isRequired,
    players: PropTypes.shape({
      a: PropTypes.shape({
        nickname: PropTypes.string,
        score: PropTypes.number,
      }),
      b: PropTypes.shape({
        nickname: PropTypes.string,
        score: PropTypes.number,
      }),
    }),
  }).isRequired,

  // container props
  participantA: PropTypes.shape({
    // uuid: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
  participantB: PropTypes.shape({
    // uuid: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
  isGameInProgress: PropTypes.bool.isRequired,
  isGameSheduled: PropTypes.bool.isRequired,
  handleClickViewLobby: PropTypes.func.isRequired,
  discipline: PropTypes.string.isRequired,

  // optional props
  isFinalMatch: PropTypes.bool,
  isGameFinished: PropTypes.bool,
  isGameCanceled: PropTypes.bool,
  isMatchTechnicalEnded: PropTypes.bool,
  isThirdPlaceMatch: PropTypes.bool,
}

Match.defaultProps = {
  // optional props
  isFinalMatch: false,
  isGameFinished: false,
  isGameCanceled: false,
  isMatchTechnicalEnded: false,
  isThirdPlaceMatch: false,
}

export default container(Match)
