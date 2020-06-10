import { createSelector } from 'reselect'

import { predictionSelectors } from './index'

export const getMatchUserPredictionSelector = createSelector(
  [predictionSelectors.allRecordsSelector],
  allPredictions => ({
    tournamentId,
    connectedTwitchAccountId,
  }) => matchId => allPredictions
    .filter(prediction => prediction?.tournamentId === tournamentId
    && prediction?.twitchUserId === connectedTwitchAccountId)
    .find(prediction => prediction.matchId === matchId),
)
