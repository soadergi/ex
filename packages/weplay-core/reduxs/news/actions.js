import { createRequestActions } from '../_factories/request/createRequestActions'

import {
  readNewspaperRequest,
  readNewsRequest,
  incrementNewspaperViewsRequest,
} from './requests'

const READ_NEWS = 'READ_NEWS'
const READ_NEWSPAPER = 'READ_NEWSPAPER'
const INCREMENT_NEWSPAPER_VIEWS = 'INCREMENT_NEWSPAPER_VIEWS'

export const readNews = createRequestActions(READ_NEWS, readNewsRequest)
export const readNewspaper = createRequestActions(READ_NEWSPAPER, readNewspaperRequest)
export const incrementNewspaperViews = createRequestActions(INCREMENT_NEWSPAPER_VIEWS, incrementNewspaperViewsRequest)
