import { createRequestActions } from '../_factories/request/createRequestActions'

import {
  makeSearchRequest,
} from './requests'

const MAKE_SEARCH = 'MAKE_SEARCH'

export const makeSearch = createRequestActions(MAKE_SEARCH, makeSearchRequest)
