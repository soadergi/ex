import { createRequestActions } from '../_factories/request/createRequestActions'

import { getSectionsRequest } from './requests'

const GET_SECTIONS = 'GET_SECTIONS'
export const getSections = createRequestActions(GET_SECTIONS, getSectionsRequest)
