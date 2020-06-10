import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'

import { useParams } from 'weplay-singleton/RouterProvider/useParams'

import { createMemberSteamIdSelector } from 'weplay-competitive/reduxs/members/selectors'
import { STATUS_CODES } from 'weplay-competitive/constants/statusCodes'

import { useMemberRequests } from './useMemberRequests'
import { useTournamentRequests } from './useTournamentRequests'
import { useMatchRequests } from './useMatchRequests'
import { useHandleMemberNotFound } from './useHandleMemberNotFound'

export const useQueryMemberAllInfo = () => {
  const dispatch = useDispatch()
  const { memberId } = useParams()
  const steamId = useSelector(createMemberSteamIdSelector(memberId))

  const {
    findMemberRequest,
    queryTeamMembersRequest,
    queryMatchMembersRequest,
    getMemberStatisticRequest,
  } = useMemberRequests()

  const {
    queryTournamentsRequest,
    queryTournamentsFromMatchRequest,
  } = useTournamentRequests()

  const {
    queryMatchesRequest,
    queryVoteItemsRequest,
    queryGameRequest,
  } = useMatchRequests()

  const handleNotFound = useHandleMemberNotFound()

  return () => dispatch(findMemberRequest)
    .catch((error) => {
      if (error?.error?.status === STATUS_CODES.NOT_FOUND) {
        return handleNotFound()
      }
      return Promise.reject(error)
    })
    .then(() => {
      if (steamId) {
        dispatch(getMemberStatisticRequest)
      }

      return Promise.all([
        dispatch(queryTournamentsRequest),
        dispatch(queryMatchMembersRequest),
        dispatch(queryGameRequest),
        dispatch(queryTeamMembersRequest),
      ])
        .then(([tournamentsResponse, matchMembersResponse]) => {
          const matches = Object.values(matchMembersResponse?.included?.match ?? {})

          const totalMatches = matchMembersResponse?.meta?.pagination?.total ?? 0

          const tournamentFromMatchIds = R.pipe(
            R.map(R.pathOr(NaN, ['relationships', 'tournament', 'data', 'id'])),
            R.uniq,
          )(matches)

          const lobbiesIds = R.pipe(
            R.map(R.pathOr(NaN, ['relationships', 'lobby', 'data', 'id'])),
            R.uniq,
          )(matches)

          return Promise.all([
            dispatch(queryMatchesRequest(lobbiesIds)),
            dispatch(queryTournamentsFromMatchRequest(tournamentFromMatchIds)),
          ])
            .then(([matchesResponse]) => {
              const votePoolIds = R.pipe(
                R.pathOr(NaN, ['included', 'lobby']),
                R.values,
                R.map(R.pathOr([], ['attributes', 'settings', 'votePool'])),
                R.flatten,
                R.uniq,
              )(matchesResponse)

              return dispatch(queryVoteItemsRequest(votePoolIds))
                .then(() => ([matches, totalMatches, tournamentsResponse]))
            })
        })
    })
}
