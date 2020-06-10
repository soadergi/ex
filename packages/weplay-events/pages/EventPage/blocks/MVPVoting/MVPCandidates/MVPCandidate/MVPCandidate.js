import React from 'react'
import PropTypes from 'prop-types'

import MVPWinner from '../../MVPWinner/MVPWinner'

import ShareMVPButton from './ShareMVPButton'
import VoteMVPButton from './VoteMVPButton'
import styles from './MVPCandidate.scss'

const MVPCandidate = ({
  candidate,
  handleVote,
  isAbleToVote,
  isChosen,
}) => (
  <div className={styles.candidate}>
    <MVPWinner
      winner={candidate.metaData}
      className={styles.mvpWinner}
    />

    {isChosen && !isAbleToVote
      ? <ShareMVPButton />
      : (
        <VoteMVPButton
          handleVote={handleVote}
          candidate={candidate}
          isAbleToVote={isAbleToVote}
        />
      )}
  </div>
)

MVPCandidate.propTypes = {
  candidate: PropTypes.shape({
    id: PropTypes.number.isRequired,
    metaData: PropTypes.shape({}),
  }).isRequired,
  handleVote: PropTypes.func.isRequired,
  isAbleToVote: PropTypes.bool.isRequired,
  isChosen: PropTypes.bool.isRequired,
}

export default React.memo(MVPCandidate)
