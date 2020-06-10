export const VOTING_RN = 'VOTING'

const initialState = {
  votingById: {},
  votingVoteById: {},
  votingResultsById: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VOTING_ITEMS':
      return {
        ...state,
        votingById: {
          ...state.votingById,
          ...action.payload,
        },
      }
    case 'SET_VOTING_VOTE':
      return {
        ...state,
        votingVoteById: {
          ...state.votingVoteById,
          ...action.payload,
        },
      }
    case 'SET_VOTING_RESULTS':
      return {
        ...state,
        votingResultsById: {
          ...state.votingResultsById,
          ...action.payload,
        },
      }
    default:
      return state
  }
}
