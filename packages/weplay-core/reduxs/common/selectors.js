import * as R from 'ramda'
import { createSelector } from 'reselect'

import { getHostByGlobalScope } from 'weplay-singleton/helpers/getHostByGlobalScope'

import getBrowserGlobal from '../../helpers/ssr/getBrowserGlobal'
import { getRequest } from '../../helpers/ssr/requests'

// ============ TODO: @Illia move to external selector =========
export const globalScopeSelector = createSelector(
  [R.prop('requestKey')],
  (requestKey) => {
    const request = getRequest(requestKey)
    return getBrowserGlobal(request)
  },
)

// ============ TODO: @Illia move to external selector =========
export const originSelector = createSelector(
  [globalScopeSelector],
  R.path(['location', 'origin']),
)

export const apiHostSelector = createSelector(
  [globalScopeSelector],
  getHostByGlobalScope,
)
