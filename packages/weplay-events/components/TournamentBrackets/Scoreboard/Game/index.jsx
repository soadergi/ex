import React from 'react'
import PropTypes from 'prop-types'

import LocalizedMoment from 'weplay-components/LocalizedMoment'

import styles from './styles.scss'
import container from './container'
import Participant from './Participant'
import Score from './Score'
import SocialLinks from './SocialLinks'
import BetProviderLinks from './BetProviderLinks'

const betProviderModifier = ['label']

const Game = ({
  // required props
  game,
  matchBets,

  // props from container
  logSocialClick,
  urls,
  participantKey,
  isGameInProgress,
  isGameSheduled,
  isTwoParticipantsExists,
  // optional props
}) => (
  <div
    className={styles.block}
    key={game.startDatetime}
  >
    <div className={styles.time}>
      <LocalizedMoment
        dateTime={game.startDatetime}
        formatKey="withTime"
      />

      <SocialLinks
        urls={urls}
        className={styles.socialLinksMobile}
        logSocialClick={logSocialClick}
      />
    </div>

    <div className={styles.participants}>
      <Participant
        participant={game[participantKey].a}
        isOnline={isGameInProgress}
        coefficient={matchBets.a}
        gameUrl={matchBets.gameUrl}
        leftSideText
      />
      <Score
        scoreA={game[participantKey].a.score}
        scoreB={game[participantKey].b.score}
        isTwoParticipantsExists={isTwoParticipantsExists}
      />
      <Participant
        participant={game[participantKey].b}
        isOnline={isGameInProgress}
        coefficient={matchBets.b}
        gameUrl={matchBets.gameUrl}
      />

      {(isGameInProgress || isGameSheduled) && isTwoParticipantsExists && (
        <BetProviderLinks
          coefficientForA={matchBets.a}
          coefficientForB={matchBets.b}
          gameUrl={matchBets.gameUrl}
          modifiers={betProviderModifier}
        />
      )}
    </div>

    <SocialLinks
      urls={urls}
      className={styles.socialLinks}
      logSocialClick={logSocialClick}
    />
  </div>
)

Game.propTypes = {
  // required props
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

  // props from container
  logSocialClick: PropTypes.func.isRequired,
  matchBets: PropTypes.shape({
    a: PropTypes.number,
    b: PropTypes.number,
    gameUrl: PropTypes.string,
  }),
  urls: PropTypes.shape({}).isRequired,
  participantKey: PropTypes.oneOf(['teams', 'players']).isRequired,
  isGameInProgress: PropTypes.bool.isRequired,
  isGameSheduled: PropTypes.bool.isRequired,
  isTwoParticipantsExists: PropTypes.bool.isRequired,
  // optional props
}

Game.defaultProps = {
  // optional props
  matchBets: {
    a: null,
    b: null,
    gameUrl: '',
  },
}

export default container(Game)
