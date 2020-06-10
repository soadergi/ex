import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import {
  getUserHistoryRequest,
  saveToHistoryRequest,
  deleteUserHistoryRequest,
  deleteHistoryByIdRequest,
} from './requests'

const GET_USER_HISTORY = 'GET_USER_HISTORY'
const SAVE_TO_USER_HISTORY = 'SAVE_TO_USER_HISTORY'
const DELETE_USER_HISTORY = 'DELETE_USER_HISTORY'
const DELETE_USER_HISTORY_BY_ID = 'DELETE_USER_HISTORY_BY_ID'

export const getUserHistory = createRequestActions(GET_USER_HISTORY, getUserHistoryRequest)
export const saveToUserHistory = createRequestActions(SAVE_TO_USER_HISTORY, saveToHistoryRequest)
export const deleteUserHistory = createRequestActions(DELETE_USER_HISTORY, deleteUserHistoryRequest)
export const deleteHistoryById = createRequestActions(DELETE_USER_HISTORY_BY_ID, deleteHistoryByIdRequest)
