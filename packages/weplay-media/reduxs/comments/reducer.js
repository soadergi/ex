import * as R from 'ramda'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

import { createRequestSelectors } from 'weplay-core/reduxs/_factories/request/createRequestSelectors'
import { createRequestReducer } from 'weplay-core/reduxs/_factories/request/createRequestReducer'
import { arrayToMapById } from 'weplay-core/reduxs/helpers'

import { MEDIA } from '../reducerName'

import { getNewspaperCommentId } from './helpers'
import {
  getComment,
  getComments,
  deleteComment,
} from './actions'

export const COMMENTS_RN = 'COMMENTS'
export const GET_COMMENTS_RN = 'GET_COMMENTS'

export default combineReducers({
  [GET_COMMENTS_RN]: createRequestReducer(getComments, {
    [getComments.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: {
        ...state.data,
        ...arrayToMapById(R.flatten(payload.data.map(item => getNewspaperCommentId(item)))),
      },
    }),
    [deleteComment.SUCCESS]: (state, { payload }) => R.assocPath(
      ['data', [payload.id], 'status'],
      'deleted',
      state,
    ),
    [getComment.SUCCESS]: (state, { payload }) => R.assocPath(['data', [payload.id]], payload, state),
  }),
})

const newspaperCommentsAsyncSelectors = createRequestSelectors([MEDIA, COMMENTS_RN, GET_COMMENTS_RN])

export const newspaperCommentsDataSelector = createSelector(
  [newspaperCommentsAsyncSelectors.dataSelector],
  R.defaultTo({}),
)

export const createCommentByIdSelector = mapPropsToId => createSelector(
  [(state, props) => mapPropsToId(props), newspaperCommentsDataSelector],
  R.propOr({}),
)

export const getCommentsByIdsSelector = commentsIds => createSelector(
  [newspaperCommentsDataSelector],
  comments => R.pipe(
    R.pick(commentsIds),
    R.values,
  )(comments),
)
