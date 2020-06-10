import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useHistory } from 'weplay-singleton/RouterProvider/useHistory'

import LocalizedMoment from 'weplay-components/LocalizedMoment'

import useMatchParticipants from 'weplay-events/hooks/useMatchParticipants'
import getWinnerIndex from 'weplay-events/pages/EventPage/helpers/getWinnerIndex'
import MatchSubtitleInfo from 'weplay-events/pages/EventPage/components/MatchSubtitleInfo/MatchSubtitleInfo'
import MatchDetailsButton from 'weplay-events/pages/EventPage/components/MatchDetails/MatchDetailsButton'
import { getMatchBetsByMatchIdSelector } from 'weplay-events/reduxs/bets/selectors'

import ScheduleParticipant from './ScheduleParticipant'
import styles from './styles.scss'

const ScheduleMatch = ({ match }) => {
  const t = useTranslation()
  const getMatchBetsByMatchId = useSelector(getMatchBetsByMatchIdSelector)
  const matchBets = useMemo(() => getMatchBetsByMatchId(match.id), [getMatchBetsByMatchId, match.id])
  const participants = useMatchParticipants({
    match,
    matchBets,
  })
  const history = useHistory()

  const winnerIndex = getWinnerIndex(participants[0].score, participants[1].score)

  const isMatchFinished = match?.status === 'finished'
  const isMatchActive = match?.status === 'active'

  const redirectToStreams = useCallback(() => {
    history.replace(history.location.pathname.replace('schedule', 'watch-live'))
  }, [history])

  return (
    <div
      className={classNames(
        styles.block,
        { [styles.isFinished]: isMatchFinished },
      )}
    >
      <div className={styles.wrapStatusMatch}>
        <span className={styles.time}>
          {match.showStartDatetime ?? match.startDatetime
            ? (
              <LocalizedMoment
                dateTime={match.startDatetime}
                formatKey="24h"
              />
            ) : 'TBD'}
        </span>

        {isMatchActive && <span className={styles.live}>{t('events.matchDetails.active')}</span>}
      </div>

      <div className={styles.match}>
        {participants.map((participant, index) => (
          <ScheduleParticipant
            key={index} // eslint-disable-line react/no-array-index-key
            className={styles.participants}
            participant={participant}
            isWinner={isMatchFinished && winnerIndex === index}
            isMatchFinished={isMatchFinished}
            gameUrl={matchBets.matchUrl}
          />
        ))}
      </div>

      <span className={styles.nameMatch}>
        <MatchSubtitleInfo match={match} />
      </span>

      <div className={styles.wrapLinks}>
        {isMatchActive
          ? (
            <button
              type="button"
              onClick={redirectToStreams}
              className={styles.scrollButton}
            >
              {t('events.scheduleBlock.game.linkText')}
            </button>
          )
          : <div />}

        <MatchDetailsButton matchId={match.id} />
      </div>
    </div>
  )
}

ScheduleMatch.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    startDatetime: PropTypes.string,
    showStartDatetime: PropTypes.bool,
  }).isRequired, // TODO: check isRequired
}

export default React.memo(ScheduleMatch)
