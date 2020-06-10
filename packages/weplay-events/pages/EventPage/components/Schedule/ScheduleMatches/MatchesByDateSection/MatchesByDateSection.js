import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import ScheduleMatch from '../ScheduleMatch'

import styles from './MatchesByDateSection.scss'

const MatchesByDateSection = ({ matchesByDate }) => {
  const t = useTranslation()
  const { locale } = useLocale()
  const matchesDate = matchesByDate.title && new Date(matchesByDate.title)
  const title = `${
    t(`events.schedule.${matchesByDate.isFinished ? 'pastGames' : 'upcomingGames'}`)
  }: ${matchesDate
    ? matchesDate.toLocaleDateString(locale, { month: 'long', day: 'numeric' })
    : 'TBA'
  }`

  return (
    // TODO: Do not use Fragment please
    <div>
      <p className={styles.title}>{title}</p>

      {matchesByDate.matches.map(match => (
        <ScheduleMatch
          key={match.id}
          match={match}
        />
      ))}
    </div>
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
}

export default React.memo(MatchesByDateSection)
