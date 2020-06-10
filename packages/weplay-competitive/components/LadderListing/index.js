import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { $isEmpty } from 'weplay-core/$utils/$isEmpty'

import EmptyState from 'weplay-competitive/components/EmptyState'
import LadderCard from 'weplay-competitive/components/LadderListing/LadderCard'
import ladderPropType from 'weplay-competitive/customPropTypes/ladderPropType'

import styles from './style.scss'

const LadderListing = ({
  ladders,
  emptyStateText,
}) => {
  const t = useTranslation()
  return (
    <>
      {$isEmpty(ladders)
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
                <th className={styles.item}>{t('competitive.member.game.status')}</th>
                <th className={styles.item}>{t('competitive.member.game.date')}</th>
                <th className={styles.item}>{t('competitive.member.game.access')}</th>
                <th className={styles.item}>{t('competitive.member.game.players')}</th>
                <th className={styles.item}>{t('competitive.member.game.prizes')}</th>
              </tr>
            </thead>
            <tbody className={styles.body}>
              {ladders.map(ladder => ladder.isFetched && (
                <LadderCard
                  key={ladder.id}
                  ladder={ladder}
                />
              ))}
            </tbody>
          </table>
        )}
    </>
  )
}

LadderListing.propTypes = {
  ladders: PropTypes.arrayOf(ladderPropType).isRequired,
  emptyStateText: PropTypes.string.isRequired,
}

export default LadderListing
