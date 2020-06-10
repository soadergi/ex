import queryString from 'query-string'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

export const useOAuth2Handler = (config) => {
  const globalScope = useSelector(globalScopeSelector)
  return useCallback(() => {
    const queryURL = queryString.stringify(config.queryParams)
    globalScope.open(
      `${config.authLink}?${queryURL}`,
      'AuthPopup',
      'resizable,scrollbars,status',
    )
  }, [config, globalScope])
}
