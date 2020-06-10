import { useCallback, useMemo } from 'react'
import queryString from 'query-string'

import { useHistory } from 'weplay-singleton/RouterProvider/useHistory'
import { useLocation } from 'weplay-singleton/RouterProvider/useLocation'

const useTimelineTabs = (tabs) => {
  const history = useHistory()
  const location = useLocation()
  const query = useMemo(() => queryString.parse(location.search), [location])
  const updateQuery = useCallback((newQuery) => {
    history.push({
      search: queryString.stringify(newQuery),
    })
  }, [history])
  const handleClearPaginationQuery = useCallback(() => {
    delete query['page-limit']
    delete query['page-offset']
  }, [query])

  const handleTabClick = useCallback(
    (tab) => {
      handleClearPaginationQuery()
      if (!tab.query) {
        delete query.timeline
      } else {
        query.timeline = tab.query
      }
      updateQuery(query)
    },
    [location, updateQuery, handleClearPaginationQuery, query],
  )
  const { timeline = '' } = useMemo(() => query, [query])
  const activeTab = useMemo(
    () => tabs.find(tab => tab.query === timeline),
    [location, tabs, timeline],
  )

  const activeTabFilter = useMemo(() => activeTab.filter, [activeTab])

  return {
    activeTab,
    activeTabFilter,
    handleTabClick,
  }
}

export default useTimelineTabs
