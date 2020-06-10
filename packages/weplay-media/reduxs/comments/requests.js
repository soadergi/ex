import { axios } from 'weplay-core/services/axios'
import { prepareRequestData } from 'weplay-core/reduxs/helpers'

const COMMENTS_URL = '/comment-service/comments'

export const getCommentRequest = id => axios
  .get(`${COMMENTS_URL}/${id}`)
  .then(prepareRequestData)

export const getCommentsRequest = ({ params }) => axios
  .get(`${COMMENTS_URL}`, { params })
  .then(prepareRequestData)

export const addCommentRequest = ({ body }) => axios
  .post(`${COMMENTS_URL}`, body)
  .then(prepareRequestData)

export const deleteCommentRequest = ({ commentId, status }) => axios
  .put(`${COMMENTS_URL}/${commentId}`, { status })
  .then(prepareRequestData)

export const rateCommentRequest = ({ commentId, direct }) => axios
  .post('/comment-service/likes', { comment_id: commentId, direct })
  .then(prepareRequestData)
