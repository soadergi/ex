import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import Participant from '../../../CrossTableSection/CrossTable/Participant/Participant'

import styles from './Standing.scss'

const Standing = ({ participant, results }) => {
  const t = useTranslation()
  const isMobileWidth = useSelector(isMobileWidthSelector)

  return (
    <div className={styles.block}>
      <Participant
        className={styles.participant}
        classNameAvatar={styles.avatar}
        classNameNickname={styles.name}
        participant={participant}
        hasName
      />

      <div className={styles.statistic}>
        {isMobileWidth && (
          <>
            <span className={styles.cellTitles}>{t('events.groupTable.winner')}</span>
            <span className={styles.cellTitles}>{t('events.groupTable.loser')}</span>
            <span className={styles.cellTitles}>{t('events.groupTable.rd')}</span>
            <span className={styles.cellTitles}>{t('events.groupTable.points')}</span>
          </>
        )}

        <span className={styles.cell}>{results.wins}</span>
        <span className={styles.cell}>{results.loses}</span>
        <span className={styles.cell}>{`${results.roundWins} - ${results.roundLoses}`}</span>
        <span className={styles.cell}>{results.points}</span>
      </div>
    </div>
  )
}

Standing.propTypes = {
  participant: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    logoUrl: PropTypes.string,
  }).isRequired,
  results: PropTypes.shape({
    wins: PropTypes.number,
    loses: PropTypes.number,
    roundWins: PropTypes.number,
    roundLoses: PropTypes.number,
    points: PropTypes.number,
  }).isRequired,
}

export default React.memo(Standing)
