import { createSelector } from 'reselect'

import { $prop } from 'weplay-core/$utils/$prop'
import { $identity } from 'weplay-core/$utils/$identity'

import { ACTIVE_TOURNAMENT_LIVE_STREAM_RN } from './reducer'

export const getActiveTournamentLiveStreamSelector = createSelector(
  [$prop(ACTIVE_TOURNAMENT_LIVE_STREAM_RN)],
  $identity,
)

export const getLiveStreamThumbnailWithDimensionsSelector = createSelector(
  [getActiveTournamentLiveStreamSelector],
  activeTournamentLiveStream => ({ width, height }) => {
    const streamThumbnailWithDimensions = activeTournamentLiveStream.streamThumbnailWithDimensions || ''
    return streamThumbnailWithDimensions.replace('{width}', width).replace('{height}', height)
  },
)
