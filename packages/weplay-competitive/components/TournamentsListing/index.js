import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'

// TODO: add support for other games
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import tournamentPropType from 'weplay-competitive/customPropTypes/tournamentPropType'
import EmptyState from 'weplay-competitive/components/EmptyState'

import TournamentCard from './TournamentCard'
import container from './container'
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
                <th className={styles.item}>{t('competitive.member.game.mode')}</th>
                <th className={styles.item}>{t('competitive.member.game.access')}</th>
                <th className={styles.item}>{t('competitive.member.game.available')}</th>
                <th className={styles.item}>{t('competitive.member.game.prizes')}</th>
              </tr>
            </thead>
            <tbody className={styles.body}>
              {tournaments.map(tournament => tournament.isFetched && (
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
  tournaments: PropTypes.arrayOf(tournamentPropType).isRequired,
  emptyStateText: PropTypes.string.isRequired,
}

export default container(TournamentsListing)
