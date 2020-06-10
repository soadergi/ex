import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Image from 'weplay-components/Image'

import useMatchParticipants from 'weplay-events/hooks/useMatchParticipants'
import { useEventsPageRefsProvider } from 'weplay-events/pages/EventPage/EventsPageRefsProvider'
import MatchDetailsButton from 'weplay-events/pages/EventPage/components/MatchDetails/MatchDetailsButton'
import { matchesSelectors } from 'weplay-events/reduxs/matches'
import getWinnerIndex from 'weplay-events/pages/EventPage/helpers/getWinnerIndex'
import { getMatchBetsByMatchIdSelector } from 'weplay-events/reduxs/bets/selectors'

import Participant from './Participant'
import styles from './styles.scss'

// eslint-disable-next-line max-len
const pariMatchLogo = 'https://static-prod.weplay.tv/2020-02-19/5b5b418ffe9ea5a73469297fb9427ab5.161604-E3E512-8A8E0C.png'

const Match = ({
  matchId,
}) => {
  const t = useTranslation()

  const match = useSelector(matchesSelectors.getRecordByIdSelector)(matchId)
  const getMatchBetsByMatchId = useSelector(getMatchBetsByMatchIdSelector)
  const matchBets = useMemo(() => getMatchBetsByMatchId(match.id), [getMatchBetsByMatchId, match.id])
  const participants = useMatchParticipants({
    match,
    matchBets,
  })

  const winnerIndex = getWinnerIndex(participants[0].score, participants[1].score)

  const isLiveTournament = match.status === 'active'
  const isScheduledTournament = match.status === 'scheduled'

  const { streamsBlockRef } = useEventsPageRefsProvider()

  const isCoefficientVisible = useMemo(
    () => matchBets?.a
      && matchBets?.b
      && match.status !== 'finished',
    [matchBets, match],
  )

  const scrollToStreams = useCallback(() => {
    if (streamsBlockRef) {
      streamsBlockRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [streamsBlockRef])

  return (
    <div className={styles.match}>
      {participants.map((participant, index) => (
        <Participant
          key={participant.key}
          participant={{ picture: participant.logo }}
          score={participant.score}
          nickname={participant.name}
          coefficient={participant.coefficient}
          isLiveTournament={isLiveTournament || isScheduledTournament}
          isWinner={match.status === 'finished' && winnerIndex === index}
          gameUrl={matchBets.matchUrl}
        />
      ))}

      <div className={styles.meta}>
        <div className={styles.wrapStream}>
          {isLiveTournament && (
            <>
              <div className={styles.notification}>
                <span className={styles.text}>Live</span>
              </div>

              <span
                onClick={scrollToStreams}
                className={styles.linkText}
              >
                {t('events.standings.match.liveButton')}
              </span>
            </>
          )}
        </div>
        <MatchDetailsButton matchId={matchId} />
      </div>

      {isCoefficientVisible && (
        <Image
          className={styles.sponsorLogo}
          src={pariMatchLogo}
        />
      )}
    </div>
  )
}

Match.propTypes = {
  // required props
  matchId: PropTypes.string.isRequired,

  // optional props
}

Match.defaultProps = {
  // optional props
}

export default React.memo(Match)
