import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import { getServicePageRequest } from './requests'

const GET_SERVICE_PAGE = 'GET_SERVICE_PAGE'
export const getServicePage = createRequestActions(GET_SERVICE_PAGE, getServicePageRequest)
