import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { $find } from 'weplay-core/$utils/$find'

import LocalizedMoment from 'weplay-components/LocalizedMoment'
import Link from 'weplay-components/Link'

import { MATCH_STATUSES } from 'weplay-events/pages/EventPage/constants'
import STREAMS_CHANNELS from 'weplay-events/constants/streamsChannels'
import MatchSubtitleInfo from 'weplay-events/pages/EventPage/components/MatchSubtitleInfo/MatchSubtitleInfo'
import MatchDetailsButton from 'weplay-events/pages/EventPage/components/MatchDetails/MatchDetailsButton'

import styles from './PredictionMatchHeader.scss'

const PredictionMatchHeader = ({ match }) => {
  const t = useTranslation()
  const { locale } = useLocale()
  const isMatchActive = useMemo(() => match.status === MATCH_STATUSES.ACTIVE, [match.status])

  const matchStreamChannel = useMemo(() => {
    const matchChannels = match.extraInfo?.twitchChannels ?? []

    if (matchChannels.length === 0) {
      return null
    }

    if (matchChannels.length === 1) {
      return STREAMS_CHANNELS.ru[matchChannels[0]] || STREAMS_CHANNELS.en[matchChannels[0]]
    }

    return STREAMS_CHANNELS[locale]
      |> Object.entries
      |> $find(([streamChannelId]) => matchChannels.includes(streamChannelId))
      |> (((streamChannel) => {
        if (!streamChannel) {
          return null
        }
        return streamChannel[1]
      }))
  },
  [match, locale])

  return (
    <div className={styles.block}>
      {isMatchActive && <span className={styles.live}>{t('events.matchDetails.active')}</span>}

      <span className={styles.time}>
        <LocalizedMoment
          formatKey="dateMonthTime"
          dateTime={match.startDatetime}
        />
      </span>

      {matchStreamChannel && (
        <Link
          to={matchStreamChannel.url}
          className={styles.tag}
          isExternal
          target="_blank"
        >
          {matchStreamChannel.label}
        </Link>
      )}

      <span className={styles.nameMatch}>
        <MatchSubtitleInfo match={match} />
      </span>

      <MatchDetailsButton
        matchId={match.id}
        className={styles.button}
      />
    </div>
  )
}

PredictionMatchHeader.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string,
    startDatetime: PropTypes.string,
    tag: PropTypes.string,
    extraInfo: PropTypes.shape({
      twitchChannels: PropTypes.arrayOf(
        PropTypes.string,
      ),
    }),
    status: PropTypes.string,
  }).isRequired,
}

export default React.memo(PredictionMatchHeader)
