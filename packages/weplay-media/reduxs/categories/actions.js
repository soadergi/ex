import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import { getCategoryRequest } from 'weplay-media/reduxs/categories/requests'

const GET_CATEGORY = 'GET_CATEGORY'
export const getCategory = createRequestActions(GET_CATEGORY, getCategoryRequest)
