import * as R from 'ramda'
import handleActions from 'redux-actions/es/handleActions'
import { createSelector } from 'reselect'

import { setBackofficeContent, clearBackofficeContent } from './actions'

export const BACKOFFICE_CONTENT_RN = 'BACKOFFICE_CONTENT'
export const contentEditLinkReducer = handleActions({
  [setBackofficeContent]: (state, action) => action.payload,
  [clearBackofficeContent]: () => null,
}, null)

const backofficeContentSelector = createSelector(
  [R.prop(BACKOFFICE_CONTENT_RN)],
  R.identity,
)
export const isContentPublishedSelector = createSelector(
  [backofficeContentSelector],
  R.propOr(true, 'isPublished'),
)
export const backofficeContentLinkSelector = createSelector(
  [backofficeContentSelector],
  R.propOr('', 'path'),
)
