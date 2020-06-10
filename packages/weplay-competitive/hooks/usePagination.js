import { useCallback, useMemo, useState } from 'react'
import queryString from 'query-string'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useHistory } from 'weplay-singleton/RouterProvider/useHistory'
import { useLocation } from 'weplay-singleton/RouterProvider/useLocation'

import { pluralTextName } from 'weplay-core/helpers/isSingular'

const usePagination = ({ name, defaultQueryValues }) => {
  const history = useHistory()
  const location = useLocation()
  const t = useTranslation()

  const updateQuery = useCallback((query) => {
    history.push({
      search: queryString.stringify(query),
    })
  }, [history])

  const query = useMemo(() => queryString.parse(location.search), [location])
  const pageOffset = useMemo(() => Number(query['page-offset']) || defaultQueryValues.OFFSET, [query])
  const pageLimit = useMemo(() => Number(query['page-limit']) || defaultQueryValues.LIMIT, [query])

  const [pagination, setPagination] = useState({
    offset: pageOffset,
    limit: pageLimit,
    total: 0,
  })

  const itemName = useMemo(
    () => t(`competitive.pagination.type.${name}.${pluralTextName(pagination.total)}`),
    [t, pagination],
  )

  const handlePaginationChange = useCallback(
    (newPagination) => {
      const { offset: newPageOffset, limit: newPageLimit } = newPagination
      if (!newPageOffset) {
        delete query['page-offset']
      } else {
        query['page-offset'] = newPageOffset
      }
      if (newPageLimit === defaultQueryValues.LIMIT) {
        delete query['page-limit']
      } else {
        query['page-limit'] = newPageLimit
      }
      updateQuery(query)
    },
    [location, updateQuery],
  )

  return {
    pageOffset,
    pageLimit,
    pagination,
    setPagination,
    itemName,
    handlePaginationChange,
  }
}

export default usePagination
