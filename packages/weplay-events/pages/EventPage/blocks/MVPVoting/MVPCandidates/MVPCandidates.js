import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import withCountDown from 'weplay-components/withCountDown'

import useCurrentTournamentStatus from 'weplay-events/pages/EventPage/hooks/useCurrentTournamentStatus'

import MVPStatusHint from '../MVPStatusHint/MVPStatusHint'

import useMVPCandidates from './useMVPCandidates'
import MVPCandidate from './MVPCandidate/MVPCandidate'
import styles from './MVPCandidates.scss'

const MVPCandidates = ({
  className,
  title,
  voting,
  isAbleToVote,
  countdown,
  nextVoteDateTime,
}) => {
  const { isEnded } = useCurrentTournamentStatus()
  const { handleVote, lastVoteItemId } = useMVPCandidates({
    countdown,
    votingId: voting.id,
    isEnded,
    isAbleToVote,
  })

  return (
    <div className={classNames(
      className,
      styles.block,
    )}
    >
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>

        <MVPStatusHint
          textClassName={styles.text}
          iconName="stopwatch"
          isTournamentEnded={isEnded}
          closestVoteDateTime={nextVoteDateTime}
          isAbleToVote={isAbleToVote}
        />
      </div>

      <div className={styles.wrapCandidates}>
        {voting.choices.map(candidate => (
          <MVPCandidate
            key={candidate.id}
            candidate={candidate}
            handleVote={handleVote}
            isAbleToVote={isAbleToVote}
            isChosen={candidate.id === lastVoteItemId}
          />
        ))}
      </div>
    </div>
  )
}

MVPCandidates.propTypes = {
  voting: PropTypes.shape({
    id: PropTypes.number,
    choices: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
  }),
  isAbleToVote: PropTypes.bool.isRequired,
  nextVoteDateTime: PropTypes.instanceOf(Date),
  countdown: PropTypes.shape({
    days: PropTypes.string,
    hours: PropTypes.string,
    minutes: PropTypes.string,
    seconds: PropTypes.string,
    isPassed: PropTypes.bool,
  }).isRequired,

  // optional props
  className: PropTypes.string,
  title: PropTypes.string,
}

MVPCandidates.defaultProps = {
  className: '',
  title: '',
  voting: {
    choices: [],
  },
  nextVoteDateTime: null,
}

export default withCountDown({ countdownTimePath: ['nextVoteDateTime'] })(MVPCandidates)
