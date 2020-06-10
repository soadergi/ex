import { useSelector } from 'react-redux'
import { useCallback, useMemo } from 'react'
import * as R from 'ramda'

import { useHistory } from 'weplay-singleton/RouterProvider/useHistory'

import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { goTo, NAMES, pathWithParamsByRoute } from 'weplay-core/routes'

import { MMMatchesSelectors } from 'weplay-competitive/reduxs/MMMatches/index'
import { MATCH_STATUSES } from 'weplay-competitive/constants/matchStatuses'

const useMMActiveMatch = () => {
  const history = useHistory()
  const currentUser = useSelector(currentUserSelector)
  const MMMatches = useSelector(MMMatchesSelectors.allRecordsSelector)

  const activeMMMatch = useMemo(
    () => {
      if (currentUser?.id && MMMatches?.length) {
        return R.findLast(
          R.anyPass([
            R.pipe(
              R.propOr([], 'teamLeft'),
              R.find(R.propEq('id', currentUser.id)),
              Boolean,
            ),
            R.pipe(
              R.propOr([], 'teamRight'),
              R.find(R.propEq('id', currentUser.id)),
              Boolean,
            ),
          ]),
        )(MMMatches)
      }
      return null
    },
    [MMMatches, currentUser],
  )

  const isActiveMMMatch = useMemo(
    () => activeMMMatch?.status === MATCH_STATUSES.VOTING
      || activeMMMatch?.status === MATCH_STATUSES.SETUP_SERVER
      || activeMMMatch?.status === MATCH_STATUSES.ONGOING,
    [activeMMMatch],
  )

  const openActiveMMMatch = useCallback(
    () => {
      if (activeMMMatch?.isFetched) {
        goTo({
          name: NAMES.MM_MATCH,
          history,
          params: {
            // TODO: @Tetiana get discipline from Game or gameMode request (we have gameMode info)
            discipline: 'cs-go',
            matchId: activeMMMatch.id,
          },
        })
      }
    },
    [history, activeMMMatch],
  )
  const linkToActiveMMMatch = useMemo(
    () => pathWithParamsByRoute(NAMES.MM_MATCH,
      {
        // TODO: @Tetiana get discipline from Game or gameMode request (we have gameMode info)
        discipline: 'cs-go',
        matchId: activeMMMatch?.id,
      }),
    [activeMMMatch],
  )

  return {
    activeMMMatch,
    isActiveMMMatch,
    openActiveMMMatch,
    linkToActiveMMMatch,
  }
}

export default useMMActiveMatch
