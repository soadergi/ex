import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { memberInfoActions } from 'weplay-competitive/reduxs/memberInfoV3'
import { MMVotesActions } from 'weplay-competitive/reduxs/MMVotes'
import { MMGameModesActions } from 'weplay-competitive/reduxs/MMGameModes'
import { MMMatchesActions, MMMatchesSelectors } from 'weplay-competitive/reduxs/MMMatches'

const useMMMatch = ({ matchId }) => {
  const dispatch = useDispatch()
  const match = useSelector(MMMatchesSelectors.createRecordByIdSelector(matchId))

  useEffect(
    () => {
      dispatch(MMMatchesActions.findRecord.request({
        id: matchId,
      }))
    },
    [matchId],
  )

  useEffect(() => {
    if (match.isFetched) {
      const {
        teamLeft: [memberLeft],
        teamRight: [memberRight],
        gameModeId,
      } = match

      dispatch(MMVotesActions.findRecord.request({
        id: matchId,
      }))

      dispatch(memberInfoActions.queryRecords.request({
        filter__id__in: [memberLeft.id, memberRight.id].join(','),
      }))

      dispatch(MMGameModesActions.findRecord.request({
        id: gameModeId,
      }))
    }
  }, [match.isFetched])
}

export default useMMMatch
