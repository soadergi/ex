import { SET_ACTIVE_TOURNAMENT_LIVE_STREAM } from './actions'

export const ACTIVE_TOURNAMENT_LIVE_STREAM_RN = 'ACTIVE_TOURNAMENT_LIVE_STREAM'

const initialState = {
  liveStreamUrl: '',
  tournamentId: '',
  streamTitle: '',
  streamThumbnailWithDimensions: '',
}

export default (state = initialState, action) => {
  if (action.type === SET_ACTIVE_TOURNAMENT_LIVE_STREAM) {
    return {
      ...state,
      ...action.payload,
    }
  }
  return state
}
