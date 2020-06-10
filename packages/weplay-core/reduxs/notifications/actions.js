import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import {
  getUserNotificationsRequest,
  deleteNotificationsRequest,
  markNotificationsAsReadRequest,
  markAllNotificationsAsReadRequest,
}
  from './requests'

const GET_USER_NOTIFICATIONS = 'GET_USER_NOTIFICATIONS'
export const getUserNotifications = createRequestActions(GET_USER_NOTIFICATIONS, getUserNotificationsRequest)

const GET_MORE_NOTIFICATIONS = 'GET_MORE_NOTIFICATIONS'
export const getMoreNotifications = createRequestActions(GET_MORE_NOTIFICATIONS, getUserNotificationsRequest)

const DELETE_NOTIFICATIONS = 'DELETE_NOTIFICATIONS'
export const deleteNotifications = createRequestActions(DELETE_NOTIFICATIONS, deleteNotificationsRequest)

const MARK_AS_READ = 'MARK_AS_READ'
export const markNotificationsAsRead = createRequestActions(MARK_AS_READ, markNotificationsAsReadRequest)

const MARK_ALL_AS_READ = 'MARK_ALL_AS_READ'
export const markAllNotificationsAsRead = createRequestActions(MARK_ALL_AS_READ, markAllNotificationsAsReadRequest)
