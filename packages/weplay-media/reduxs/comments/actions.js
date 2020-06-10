import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import {
  getCommentRequest,
  getCommentsRequest,
  addCommentRequest,
  deleteCommentRequest,
  rateCommentRequest,
} from './requests'

const GET_COMMENT = 'GET_COMMENT'
const GET_COMMENTS = 'GET_COMMENTS'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'
const RATE_COMMENT = 'RATE_COMMENT'

export const getComment = createRequestActions(GET_COMMENT, getCommentRequest)
export const getComments = createRequestActions(GET_COMMENTS, getCommentsRequest)
export const addComment = createRequestActions(ADD_COMMENT, addCommentRequest)
export const deleteComment = createRequestActions(DELETE_COMMENT, deleteCommentRequest)
export const rateComment = createRequestActions(RATE_COMMENT, rateCommentRequest)
