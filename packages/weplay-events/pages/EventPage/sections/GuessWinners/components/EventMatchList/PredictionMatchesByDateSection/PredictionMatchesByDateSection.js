import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import PredictionMatch from '../PredictionMatch/PredictionMatch'

import styles from './MatchesByDateSection.scss'

const MatchesByDateSection = ({ matchesByDate, makePrediction }) => {
  const t = useTranslation()
  const { locale } = useLocale()

  const matchesByDateTitle = useMemo(() => {
    const pastOrUpcomingText = t(`events.schedule.${matchesByDate.isFinished ? 'pastGames' : 'upcomingGames'}`)
    const matchesDateText = matchesByDate.title
      ? new Date(matchesByDate.title).toLocaleDateString(locale, { month: 'long', day: 'numeric' })
      : 'TBA'

    return `${pastOrUpcomingText}: ${matchesDateText}`
  }, [matchesByDate, t, locale])

  return (
    <>
      <p className={styles.title}>{matchesByDateTitle}</p>

      {matchesByDate.matches.map(match => (
        <PredictionMatch
          key={match.id}
          match={match}
          makePrediction={makePrediction}
        />
      ))}
    </>
  )
}

MatchesByDateSection.propTypes = {
  matchesByDate: PropTypes.shape({
    title: PropTypes.string,
    isFinished: PropTypes.bool,
    matches: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
  }).isRequired,
  makePrediction: PropTypes.func.isRequired,
}

export default React.memo(MatchesByDateSection)
