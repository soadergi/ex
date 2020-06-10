import { useMemo, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { gamesActions } from 'weplay-events/reduxs/games'

function useMatchDetailsContent({ match, participants }) {
  const dispatch = useDispatch()

  const matchGameIds = useMemo(() => {
    const matchRelationshipGames = match.relationships?.games ?? []
    return matchRelationshipGames.map(game => game.id)
  }, [match])

  const isParticipantsHaveScore = useMemo(
    () => Boolean(typeof (participants[0]?.score) === 'number' && typeof (participants[1]?.score) === 'number'),
    [participants],
  )

  useEffect(() => {
    dispatch(gamesActions.queryRecords.request({
      'filter[match.id]': match?.id,
    }))
  }, [match.id, dispatch])

  return {
    matchGameIds,
    isParticipantsHaveScore,
  }
}

export default useMatchDetailsContent
