import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import useAction from 'weplay-core/helpers/useAction'

import { laddersActions, laddersSelectors } from 'weplay-competitive/reduxs/ladders'
import useTimelineTabs from 'weplay-competitive/hooks/useTimelineTabs'
import usePagination from 'weplay-competitive/hooks/usePagination'

import { DEFAULT_QUERY_VALUES, getTabs } from './tableConfig'

const useLadderTable = () => {
  const t = useTranslation()
  const { locale } = useLocale()
  const tabs = useMemo(() => getTabs(t), [t])
  const { queryLaddersRequest } = useAction({ queryLaddersRequest: laddersActions.queryRecords.request })

  const [isLoading, setIsLoading] = useState(true)
  const [fetchedRecordIds, updateFetchedRecordIds] = useState([])

  const fetchedRecords = useSelector(laddersSelectors.createRecordsByIdsSelector(fetchedRecordIds))

  const {
    activeTab,
    handleTabClick,
  } = useTimelineTabs(tabs)

  const {
    pageOffset,
    pageLimit,
    pagination,
    setPagination,
    itemName,
    handlePaginationChange,
  } = usePagination({ name: 'ladders', defaultQueryValues: DEFAULT_QUERY_VALUES })

  useEffect(() => {
    setIsLoading(true)
    queryLaddersRequest({
      filter__ladder_status__in: activeTab.filter,
      page__limit: pageLimit,
      page__offset: pageOffset,
      sort: activeTab.sort,
    })
      .then((response) => {
        const paginatedFilteredLadderIds = response.data.map(ladder => ladder.id)
        updateFetchedRecordIds(paginatedFilteredLadderIds)
        setPagination(response.meta.pagination)
        setIsLoading(false)
      })
  }, [activeTab, pageLimit, pageOffset, locale, queryLaddersRequest, setPagination, setIsLoading])

  return {
    isLoading,
    tabs,
    handleTabClick,
    activeTab,
    pagination,
    fetchedRecords,
    itemName,
    handlePaginationChange,
  }
}

export default useLadderTable
