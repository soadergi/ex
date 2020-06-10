import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import useSortedByDateGridMatches from 'weplay-events/hooks/useSortedByDateGridMatches'
import { gridItemsActions } from 'weplay-events/reduxs/gridItems'
import { MAX_ENTITIES_PER_REQUEST } from 'weplay-events/pages/EventPage/constants'

export const useScheduleMatches = (grid) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (grid?.id) {
      dispatch(gridItemsActions.queryRecords.request({
        'filter[grid.id]': grid.id,
        included: 'matches',
        'page[limit]': MAX_ENTITIES_PER_REQUEST,
      }))
    }
  }, [dispatch, grid.id])

  const sortedByDateGridMatches = useSortedByDateGridMatches({
    gridIds: [grid.id],
    withTBAMatches: true,
  })

  return sortedByDateGridMatches
}
