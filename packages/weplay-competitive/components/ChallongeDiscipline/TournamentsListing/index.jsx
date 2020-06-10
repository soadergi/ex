import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import EmptyState from 'weplay-competitive/components/EmptyState'
import underlordsTournamentPropType from 'weplay-competitive/customPropTypes/underlordsTournamentPropType'

import TournamentCard from './TournamentCard'
import styles from './style.scss'

const TournamentsListing = ({
  tournaments,
  emptyStateText,
}) => {
  const t = useTranslation()
  return (
    <>
      {R.isEmpty(tournaments)
        ? (
          <div className={styles.wrapper}>
            <EmptyState
              text={emptyStateText}
              avatar=""
              isHorizontal
            />
          </div>
        )
        : (
          <table className={styles.tournamentTable}>
            <thead className={styles.header}>
              <tr>
                <th className={styles.item}>{t('competitive.member.game.name')}</th>
                <th className={styles.item}>{t('competitive.member.game.date')}</th>
                <th className={styles.item}>{t('competitive.member.game.type')}</th>
                <th className={styles.item}>{t('competitive.member.game.available')}</th>
                <th className={styles.item}>{t('competitive.member.game.prizes')}</th>
              </tr>
            </thead>
            <tbody className={styles.body}>
              {tournaments.map(tournament => (
                <TournamentCard
                  key={tournament.id}
                  tournament={tournament}
                />
              ))}
            </tbody>
          </table>
        )}
    </>
  )
}

TournamentsListing.propTypes = {
  tournaments: PropTypes.arrayOf(underlordsTournamentPropType).isRequired,
  emptyStateText: PropTypes.string.isRequired,
}

export default TournamentsListing
