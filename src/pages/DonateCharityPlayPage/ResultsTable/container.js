import {
  useEffect,
  useMemo,
  useCallback,
  useState,
} from 'react'
import { useSelector } from 'react-redux'

import useAction from 'weplay-core/helpers/useAction'

import { charityGameLeadersSelector } from 'reduxs/donateCharityPlay/reducer'
import { getCharityLeaders } from 'reduxs/donateCharityPlay/actions'

export const useCharityGame = () => {
  const paginationDefault = {
    offset: 0,
    limit: 20,
    total: 0,
  }

  const leaders = useSelector(charityGameLeadersSelector.dataSelector)

  const [pagination, setPagination] = useState(paginationDefault)
  const [isLoading, setIsLoading] = useState(false)

  const { getLeaders } = useAction({
    getLeaders: getCharityLeaders.request,
  })

  const isLoadMoreAvailable = useMemo(
    () => pagination.offset + pagination.limit < pagination.total,
    [pagination],
  )

  const totalLeaders = useMemo(
    () => pagination.total,
    [pagination],
  )

  const getLeadersWithPaginationUpdate = useCallback((offset = pagination.offset) => {
    setIsLoading(true)
    getLeaders({
      page__offset: offset,
      page__limit: pagination.limit,
    }).then((res) => {
      setPagination({ ...res.meta.pagination })
      setIsLoading(false)
    })
  }, [pagination, setIsLoading])

  const handleLoadMore = useCallback(() => {
    const offset = pagination.offset + pagination.limit
    getLeadersWithPaginationUpdate(offset)
  }, [pagination])

  useEffect(() => {
    getLeadersWithPaginationUpdate()
  }, [])

  return {
    leaders,
    totalLeaders,
    isLoading,
    isLoadMoreAvailable,
    handleLoadMore,
  }
}
