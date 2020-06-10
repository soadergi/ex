import { readLiveCommentsRequest } from 'reduxs/liveComments/requests'
import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'
import { createReduxAction } from 'weplay-core/reduxs/_legacy/reduxHelpers'

const READ_LIVE_COMMENTS = 'READ_LIVE_COMMENTS'
export const readLiveComments = createRequestActions(READ_LIVE_COMMENTS, readLiveCommentsRequest)

export const SAVE_LIVE_COMMENT = 'SAVE_LIVE_COMMENT'
export const saveLiveComment = createReduxAction(SAVE_LIVE_COMMENT)
