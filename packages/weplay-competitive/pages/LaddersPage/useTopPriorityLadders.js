import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import useAction from 'weplay-core/helpers/useAction'

import { laddersActions, laddersSelectors } from 'weplay-competitive/reduxs/ladders'
import { LADDER_STATUSES } from 'weplay-competitive/constants/ladderStatuses'

export const useTopPriorityLadders = () => {
  const [topPriorityLaddersIds, setTopPriorityLaddersIds] = useState([])
  const getLadderById = useSelector(laddersSelectors.getRecordByIdSelector)
  const topPriorityLadders = useMemo(
    () => topPriorityLaddersIds.map(id => getLadderById(id)),
    [topPriorityLaddersIds, getLadderById],
  )
  const { queryLaddersRequest } = useAction({ queryLaddersRequest: laddersActions.queryRecords.request })

  useEffect(() => {
    queryLaddersRequest({
      filter__is_top_priority__eq: true,
      filter__ladder_status__in: `${LADDER_STATUSES.ONGOING}`,
      page__limit: 3,
    })
      .then((response) => {
        const laddersIds = response.data.map(ladder => ladder.id)
        setTopPriorityLaddersIds(laddersIds)
      })
  }, [])

  return {
    topPriorityLadders,
  }
}
