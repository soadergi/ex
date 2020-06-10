import {
  useEffect, useState, useCallback, useMemo,
} from 'react'

import { SUB_API_ACTIONS } from 'weplay-core/consts/subApiActions'
import useAction from 'weplay-core/helpers/useAction'

import { userScoreActions } from 'weplay-competitive/reduxs/userScores'
import { scoresActions } from 'weplay-competitive/reduxs/scores'

const paginationDefault = {
  offset: 0,
  limit: 10,
  total: 0,
}
export const useScoresWithPagination = ({ ladderId }) => {
  const [pagination, setPagination] = useState(paginationDefault)
  const [isLoading, setIsLoading] = useState(false)

  const { getScore } = useAction({
    getScore: scoresActions.queryRecords.request,
  })

  const { getUserScore } = useAction({
    getUserScore: userScoreActions.findRecord.request,
  })

  const { clearScores } = useAction({
    clearScores: scoresActions.clearRecords,
  })

  const { clearUserScores } = useAction({
    clearUserScores: userScoreActions.clearRecords,
  })

  const clearScoreData = useCallback(
    () => {
      clearScores()
      clearUserScores()
    },
    [clearScores, clearUserScores],
  )

  const getScoresWithPaginationUpdate = useCallback((isNextPage = false) => {
    setIsLoading(true)
    const offset = isNextPage ? (pagination.offset + pagination.limit) : pagination.offset
    getScore({
      filter__ladder_id__eq: ladderId,
      page__offset: offset,
      page__limit: pagination.limit,
    }).then((res) => {
      setPagination(res.meta.pagination)
      setIsLoading(false)
    })
  }, [ladderId, pagination, setIsLoading])

  const handleLoadScores = useCallback(() => {
    getScoresWithPaginationUpdate(true)
  }, [ladderId, pagination])

  const isLoadMoreAvailable = useMemo(
    () => pagination.offset + pagination.limit < pagination.total,
    [pagination],
  )

  const scoresTotal = pagination.total

  useEffect(() => {
    getScoresWithPaginationUpdate()
    getUserScore({
      filter__ladder_id__eq: ladderId,
      subApiAction: SUB_API_ACTIONS.ME,
    })
    return () => clearScoreData()
  }, [ladderId])

  return {
    isLoadMoreAvailable,
    isLoading,
    scoresTotal,
    handleLoadScores,
  }
}
