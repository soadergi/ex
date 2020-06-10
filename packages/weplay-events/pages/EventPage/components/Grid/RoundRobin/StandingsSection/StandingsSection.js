import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import gridPropType from 'weplay-events/customPropTypes/gridPropType'

import RoundRobinStandings from './RoundRobinStandings/RoundRobinStandings'
import styles from './StandingsSection.scss'

const StandingsSection = ({ grid, participants, matchesByParticipant }) => {
  const t = useTranslation()
  const isMobileWidth = useSelector(isMobileWidthSelector)

  return (
    <div className={styles.block}>
      <div className={styles.wrap}>
        <p className={styles.title}>{`${grid.name} ${t('events.roundRobin.standingsSectionTitle')}`}</p>

        {!isMobileWidth && (
          <div className={styles.gridTitles}>
            <span className={styles.cell}>{t('events.groupTable.winner')}</span>
            <span className={styles.cell}>{t('events.groupTable.loser')}</span>
            <span className={styles.cell}>{t('events.groupTable.rd')}</span>
            <span className={styles.cell}>{t('events.groupTable.points')}</span>
          </div>
        )}
      </div>

      <RoundRobinStandings
        matchesByParticipant={matchesByParticipant}
        participants={participants}
      />
    </div>
  )
}

StandingsSection.propTypes = {
  grid: gridPropType.isRequired,
  participants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  matchesByParticipant: PropTypes.shape({}).isRequired,
}

export default React.memo(StandingsSection)
