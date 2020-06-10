import React from 'react'
import { useSelector } from 'react-redux'

import ModalBase from 'weplay-components/ModalBase'

import { matchesSelectors } from 'weplay-events/reduxs/matches'
import useMatchParticipants from 'weplay-events/hooks/useMatchParticipants'

import MatchDetailsContent from './MatchDetailsContent/MatchDetailsContent'
import styles from './MatchDetails.scss'
import { useMatchDetails } from './MatchDetailsProvider'

const MatchDetails = () => {
  const { matchId, setMatchId } = useMatchDetails()

  const getMatchById = useSelector(matchesSelectors.getRecordByIdSelector)
  const match = getMatchById(matchId)
  const participants = useMatchParticipants({ match })

  return (
    <ModalBase
      isShown={Boolean(matchId)}
      isCloseBtnHidden
      modifiers={['paddingLess']}
    >
      <div className={styles.modalContent}>
        <MatchDetailsContent
          onClose={() => setMatchId(null)}
          match={match}
          participants={participants}
        />
      </div>
    </ModalBase>
  )
}

export default React.memo(MatchDetails)
