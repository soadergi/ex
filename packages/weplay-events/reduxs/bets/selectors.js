import { createSelector } from 'reselect'

import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'

import { matchesSelectors } from 'weplay-events/reduxs/matches'
import { participantsWithDataSelector } from 'weplay-events/reduxs/getTournamentParticipantsByTournamentIdSelector'

import { GET_PARIMATCH_BETS } from './actions'
import { BETS_RN } from './reducer'

export const parimatchBetsSelectors = createRequestSelectors(['EVENTS', BETS_RN, GET_PARIMATCH_BETS])

export const getMatchBetsByMatchIdSelector = createSelector(
  [parimatchBetsSelectors.dataSelector, matchesSelectors.getRecordByIdSelector, participantsWithDataSelector],
  (parimatchBets, getMatchById, participantsWithData) => (matchId) => {
    if (!parimatchBets) {
      return {
        a: null,
        b: null,
        matchUrl: '',
      }
    }

    const match = getMatchById(matchId)

    const participantAId = match.relationships.participants[0]?.id
    const participantBId = match.relationships.participants[1]?.id

    const participantA = participantsWithData.find(({ participant }) => participant.id === participantAId)
    const participantB = participantsWithData.find(({ participant }) => participant.id === participantBId)

    const betNameA = participantA?.bettingInfo?.parimatch
    const betNameB = participantB?.bettingInfo?.parimatch
    const betId = match.extraInfo.betMatchId

    const bettingInfo = parimatchBets[betId] ?? {}

    return {
      a: bettingInfo.participant1 === betNameA ? bettingInfo.coef1 : bettingInfo.coef2,
      b: bettingInfo.participant2 === betNameB ? bettingInfo.coef2 : bettingInfo.coef1,
      // TODO: @Anton For now en link for bet doesn't work at Parimath. So decided to use ru everywhere
      matchUrl: bettingInfo.urls?.ru,
    }
  },
)
