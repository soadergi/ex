import { createSelector } from 'reselect'

import { VOTING_RN } from 'weplay-events/reduxs/voting/reducer'

const EVENTS_RN = 'EVENTS'

const getVotingSelector = state => state[EVENTS_RN][VOTING_RN]

export const getVotingByVotingIdSelector = createSelector(
  [getVotingSelector],
  voting => id => voting.votingById[id],
)

export const getVotingCandidateByIdSelector = createSelector(
  [getVotingByVotingIdSelector],
  getVotingByIdSelector => (votingId, candidateId) => getVotingByIdSelector(votingId)?.choices
    .find(choice => choice.id === candidateId),
)

export const getVotingVoteByIdSelector = createSelector(
  [getVotingSelector],
  voting => id => voting.votingVoteById[id],
)

export const getVotingResultsByIdSelector = createSelector(
  [getVotingSelector],
  voting => id => voting.votingResultsById[id],
)
