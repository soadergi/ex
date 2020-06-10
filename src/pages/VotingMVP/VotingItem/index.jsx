import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ArticleItemWrap from 'weplay-components/_wrappers/ArticleItemWrap'

import CandidateAvatar from '../CandidateAvatar'
import CandidateInfo from '../CandidateInfo'
import VoteButton from '../VoteButton'

import container from './container'
import styles from './styles.scss'

const VotingItem = ({
  // required props
  candidate,
  isWinner,
  stats,
  votingStartDatetime,
  isHighlighted,

  // container props
  votingRef,
  tournamentTitle,
  socials,
  modifiers,
  handleVote,

  // optional props
  isVotingFinished,
  copyLink,
}) => (
  <ArticleItemWrap
    innerRef={votingRef}
    className={styles.candidateVotedWrapper}
  >
    <div
      className={classNames(
        styles.candidateWrapper,
        { [styles.highLight]: isHighlighted },
        { [styles.votingFinished]: isWinner },
      )}
    >

      <CandidateAvatar
        candidate={candidate}
        socials={socials}
      />

      <CandidateInfo
        candidate={candidate}
        stats={stats}
      />

      <VoteButton
        candidate={candidate}
        modifiers={modifiers}
        tournamentTitle={tournamentTitle}
        copyLink={copyLink}
        isVotingFinished={isVotingFinished}
        votingStartDatetime={votingStartDatetime}
        handleVote={handleVote}
      />

    </div>
  </ArticleItemWrap>

)

VotingItem.propTypes = {
  // required props
  candidate: PropTypes.shape({}).isRequired,
  isWinner: PropTypes.bool.isRequired,
  isHighlighted: PropTypes.bool.isRequired,
  stats: PropTypes.shape({}).isRequired,
  votingStartDatetime: PropTypes.bool.isRequired,

  // container props
  votingRef: PropTypes.func.isRequired,
  tournamentTitle: PropTypes.string,
  socials: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  modifiers: PropTypes.arrayOf(PropTypes.string),
  handleVote: PropTypes.func.isRequired,

  // optional props
  isVotingFinished: PropTypes.bool,
  copyLink: PropTypes.string,
}

VotingItem.defaultProps = {
  // optional props
  modifiers: [],
  tournamentTitle: '',
  copyLink: '',
  isVotingFinished: false,
}

export default container(VotingItem)
