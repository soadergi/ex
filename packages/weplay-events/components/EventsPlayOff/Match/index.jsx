/* eslint-disable max-lines */
// TODO: @Events team - drop this ancient code when all tournament will be on Event page.
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import participantPropType from 'weplay-core/customPropTypes/participantPropType'
import gamePropType from 'weplay-core/customPropTypes/gamePropType'

import NotificationLabel from 'weplay-components/NotificationLabel'
import LocalizedMoment from 'weplay-components/LocalizedMoment'
import Popup from 'weplay-components/Popup'

import SocialLinks from 'weplay-events/components/TournamentBrackets/Scoreboard/Game/SocialLinks'
import BetProviderLogo from 'weplay-events/components/BetProviderLogo'
import MatchDetails from 'weplay-events/components/MatchDetails'

import Participant from '../Participant'

import styles from './styles.scss'
import container from './container'

const Match = ({
  // required props
  game,
  isTournamentFinished,

  // container props
  matchBets,
  participantA,
  participantB,
  isGameInProgress,
  isGameFinished,
  isGameSheduled,
  isTwoParticipantsExists,
  i18nTexts,
  logSocialClick,

  // optional props
  isFinalMatch,
  isGrandFinal,
  isReverted,
  isSuperFinal,
  hasFinalRound,
  urls,
  isFullBracket,
  isFullBracketSuperFinal,
  isThirdPlaceMatch,
  hasDarkBackground,
  stage3playOff,
  hasBracketNote,
  tournamentTitle,
}) => (
  <div className={classNames(
    styles.match,
    styles[tournamentTitle],
    {
      [styles.isFinalMatch]: isFinalMatch,
      [styles.isGrandFinal]: isGrandFinal,
      [styles.isReverted]: isReverted,
      [styles.superFinal]: isSuperFinal,
      [styles.hasFinalRound]: hasFinalRound,
      [styles.fullBracketSuperFinal]: isFullBracketSuperFinal,
    },
  )}
  >
    <Participant
      participant={participantA}
      coefficient={matchBets.a}
      gameUrl={matchBets.gameUrl}
      isWinner={participantA && participantB ? participantA.score > participantB.score : !participantB}
      isParticipantFinal={isFinalMatch}
      isGameSheduled={isGameSheduled}
      isInvited={participantA.inviteStatus}
      isTournamentFinished={isTournamentFinished}
      isFullBracket={isFullBracket}
      isGameFinished={isGameFinished}
      isTwoParticipantsExists={isTwoParticipantsExists}
      isThirdPlaceMatch={isThirdPlaceMatch}
      hasDarkBackground={hasDarkBackground}
      stage3playOff={stage3playOff}
      hasBracketNote={hasBracketNote}
      tournamentTitle={tournamentTitle}
    />

    {participantB && (
      <Participant
        participant={participantB}
        coefficient={matchBets.b}
        gameUrl={matchBets.gameUrl}
        isWinner={participantA && participantB ? participantA.score < participantB.score : false}
        isParticipantFinal={isFinalMatch}
        isGameSheduled={isGameSheduled}
        isInvited={participantB.inviteStatus}
        isTournamentFinished={isTournamentFinished}
        isFullBracket={isFullBracket}
        isGameFinished={isGameFinished}
        isTwoParticipantsExists={isTwoParticipantsExists}
        isThirdPlaceMatch={isThirdPlaceMatch}
        hasDarkBackground={hasDarkBackground}
      />
    )}

    <div className={styles.meta}>
      <p className={classNames(
        styles.matchTitle,
        {
          'u-color-white': isSuperFinal && !hasFinalRound && !isFullBracketSuperFinal,
        },
      )}
      >
        {game.startDatetime && (
        <LocalizedMoment
          dateTime={game.startDatetime}
          formatKey="short"
        />
        )}
      </p>
      {!isGameInProgress && game.urls && (
      <SocialLinks
        urls={urls}
        logSocialClick={logSocialClick}
      />
      )}

      { !isGameInProgress && game.whMatchId && (
        <Popup
          renderTrigger={({
            handlePopupToggle,
            saveTriggerRef,
          }) => (
            <button
              type="button"
              ref={saveTriggerRef}
              className={styles.detailsButton}
              onClick={handlePopupToggle}
            >
              {i18nTexts.tugOfWar.matchDetailsButton.name}
            </button>
          )}
          renderContent={({
            onClose,
          }) => (
            <MatchDetails
              participantA={participantA}
              participantB={participantB}
              matchId={game.whMatchId}
              mapHighlights={game.maps}
              onClose={onClose}
            />
          )}
        />
      )}
      {isGameInProgress && (
      <div className={styles.notificationText}>
        {i18nTexts.streamBanner.live}
        <NotificationLabel
          isActive
          className={styles.notification}
        />
      </div>
      )}
    </div>

    {(isGameInProgress || isGameSheduled) && isTwoParticipantsExists && (
    <BetProviderLogo
      className={styles.sponsorLogo}
    />
    )}
  </div>
)

Match.propTypes = {
  // required props
  game: gamePropType.isRequired,
  isTournamentFinished: PropTypes.bool.isRequired,

  // container props
  matchBets: PropTypes.shape({
    a: PropTypes.number,
    b: PropTypes.number,
    gameUrl: PropTypes.string,
  }),
  participantA: participantPropType.isRequired,
  participantB: participantPropType,
  isGameInProgress: PropTypes.bool.isRequired,
  isGameSheduled: PropTypes.bool.isRequired,
  isTwoParticipantsExists: PropTypes.bool.isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  logSocialClick: PropTypes.func.isRequired,
  urls: PropTypes.shape({}).isRequired,

  // optional props
  isFinalMatch: PropTypes.bool,
  isGrandFinal: PropTypes.bool,
  isReverted: PropTypes.bool,
  isSuperFinal: PropTypes.bool,
  hasFinalRound: PropTypes.bool,
  isFullBracket: PropTypes.bool,
  isGameFinished: PropTypes.bool,
  isFullBracketSuperFinal: PropTypes.bool,
  isThirdPlaceMatch: PropTypes.bool,
  hasDarkBackground: PropTypes.bool,
  tournamentTitle: PropTypes.string,
  stage3playOff: PropTypes.bool,
  hasBracketNote: PropTypes.bool,
}

Match.defaultProps = {
  // optional props
  isFinalMatch: false,
  isGrandFinal: false,
  isReverted: false,
  isSuperFinal: false,
  hasFinalRound: false,
  isFullBracket: false,
  isGameFinished: false,
  isFullBracketSuperFinal: false,
  isThirdPlaceMatch: false,
  hasDarkBackground: false,
  tournamentTitle: '',
  stage3playOff: false,
  hasBracketNote: false,
  participantB: null,
  matchBets: {
    a: null,
    b: null,
    gameUrl: '',
  },
}

export default container(Match)
