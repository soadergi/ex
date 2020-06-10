import { createRequestActions } from '../_factories/request/createRequestActions'

import { readHomepageRequest } from './requests'

const READ_HOMEPAGE = 'READ_HOMEPAGE'

export const readHomepage = createRequestActions(READ_HOMEPAGE, readHomepageRequest)
