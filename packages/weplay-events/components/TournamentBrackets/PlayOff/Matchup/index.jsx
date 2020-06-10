import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import LocalizedMoment from 'weplay-components/LocalizedMoment'
import NotificationLabel from 'weplay-components/NotificationLabel'

import Participant from '../Participant'
import SocialLinks from '../../Scoreboard/Game/SocialLinks'
import BetProviderLogo from '../../../BetProviderLogo'

import styles from './matchup.scss'
import container from './container'

const Matchup = ({
  participantA,
  participantB,
  isGameInProgress,
  isGameSheduled,
  isFinalMatchup,
  urls,
  logSocialClick,
  isTournamentFinished,
  matchBets,
  className,
  hasConnector,
  game,
  isTwoParticipantsExists,
}) => (
  <div className={
    classNames(styles.matchup,
      {
        [className]: className,
      })
}
  >
    <div className={styles.participants}>
      <Participant
        participant={participantA}
        coefficient={matchBets.a}
        gameUrl={matchBets.gameUrl}
        isWinner={participantA && participantB ? participantA.score > participantB.score : false}
        isParticipantFinal={isFinalMatchup}
        isGameSheduled={isGameSheduled}
        isInvited={participantA.inviteStatus}
        isTournamentFinished={isTournamentFinished}
      />

      {(isGameInProgress || isGameSheduled) && isTwoParticipantsExists && (
        <BetProviderLogo
          className={styles.sponsorLogo}
        />
      )}

      {isGameInProgress && (
        <NotificationLabel
          isActive
          className={styles.notification}
        />
      )}

      <Participant
        participant={participantB}
        coefficient={matchBets.b}
        gameUrl={matchBets.gameUrl}
        isWinner={participantA && participantB ? participantA.score < participantB.score : false}
        isParticipantFinal={isFinalMatchup}
        isGameSheduled={isGameSheduled}
        isInvited={participantB.inviteStatus}
        isTournamentFinished={isTournamentFinished}
      />

      <div className={styles.meta}>
        <p className={styles.matchTitle}>
          {game.startDatetime && (
          <LocalizedMoment
            dateTime={game.startDatetime}
            formatKey="withTime"
          />
          )}
        </p>

        <SocialLinks
          urls={urls}
          logSocialClick={logSocialClick}
        />
      </div>
    </div>

    {hasConnector && (
      <div className={styles.connector}>
        <div className={styles.merger} />
        <div className={styles.line} />
      </div>
    )}
  </div>
)

Matchup.propTypes = {
  // required props
  isGameInProgress: PropTypes.bool.isRequired,
  isGameSheduled: PropTypes.bool.isRequired,
  isTwoParticipantsExists: PropTypes.bool.isRequired,
  matchBets: PropTypes.shape({
    a: PropTypes.number,
    b: PropTypes.number,
    gameUrl: PropTypes.string,
  }),
  participantA: PropTypes.shape({
    uuid: PropTypes.string,
    score: PropTypes.number,
    inviteStatus: PropTypes.string,
  }).isRequired,
  participantB: PropTypes.shape({
    uuid: PropTypes.string,
    score: PropTypes.number,
    inviteStatus: PropTypes.string,
  }).isRequired,
  urls: PropTypes.shape({}).isRequired,
  logSocialClick: PropTypes.func.isRequired,
  isTournamentFinished: PropTypes.bool.isRequired,
  game: PropTypes.shape({
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
  // optional props
  className: PropTypes.string,
  isFinalMatchup: PropTypes.bool,
  hasConnector: PropTypes.bool,
}

Matchup.defaultProps = {
  className: '',
  isFinalMatchup: false,
  hasConnector: false,
  matchBets: {
    a: null,
    b: null,
    gameUrl: '',
  },
}

export default container(Matchup)
