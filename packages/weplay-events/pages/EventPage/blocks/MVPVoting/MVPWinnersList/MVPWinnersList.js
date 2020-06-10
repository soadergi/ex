import React, { useMemo } from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { getDisciplineByTournamentIdSelector } from 'weplay-events/reduxs/discipline/selectors'
import { VOTING_IDS_BY_TOURNAMENT_SLUG } from 'weplay-events/services/voting-service/constants'
import { TOURNAMENT_STATUSES } from 'weplay-events/pages/EventPage/constants'
import tournamentPropType from 'weplay-events/customPropTypes/tournamentPropType'

import MVPWinner from '../MVPWinner/MVPWinner'

import styles from './MVPWinnersList.scss'
import useMVPWinner from './useMVPWinner'

const MVPWinnersList = ({ tournament }) => {
  const t = useTranslation()

  const { CORE_VOTING_ID, SUPPORT_VOTING_ID } = VOTING_IDS_BY_TOURNAMENT_SLUG[tournament.slug] ?? {}

  const isEnded = useMemo(() => tournament.status === TOURNAMENT_STATUSES.ENDED, [tournament.status])

  const MVPWinnerCore = useMVPWinner(CORE_VOTING_ID, isEnded)
  const MVPWinnerSupport = useMVPWinner(SUPPORT_VOTING_ID, isEnded)

  const disciplineSelector = useSelector(getDisciplineByTournamentIdSelector)
  const discipline = disciplineSelector(tournament.id)
  const isDota2 = discipline.name === 'Dota2'

  return (
    <div className={classNames(
      styles.mvp,
      { [styles.isOffSeparator]: !isDota2 },
    )}
    >
      <MVPWinner
        title={isDota2 ? t('events.MVPVotingBanner.MVPWinner.title.core') : null}
        prize={isDota2 ? t('events.MVPVotingBanner.MVPWinner.prize') : null}
        winner={MVPWinnerCore?.metaData}
      />

      {isDota2 && (
        <MVPWinner
          title={t('events.MVPVotingBanner.MVPWinner.title.support')}
          prize={t('events.MVPVotingBanner.MVPWinner.prize')}
          winner={MVPWinnerSupport?.metaData}
        />
      )}
    </div>
  )
}

MVPWinnersList.propTypes = {
  tournament: tournamentPropType.isRequired,
}

export default React.memo(MVPWinnersList)
