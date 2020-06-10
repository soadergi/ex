import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { laddersActions } from 'weplay-competitive/reduxs/ladders'
import { MATCH_STATUSES } from 'weplay-competitive/constants/matchStatuses'

export const useQueryLaddersRequest = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(laddersActions.queryRecords.request({
      filter__ladder_status__eq: MATCH_STATUSES.ONGOING,
    }))
  }, [dispatch])
}
