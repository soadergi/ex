import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import {
  createUserSubscriptionRequest,
  deleteUserSubscriptionRequest,
  getUserSubscriptionsRequest,
  getSubscriptionScopesRequest,
  createSubscriptionApproveRequest,
} from './requests'

const CREATE_USER_SUBSCRIPTION = 'CREATE_USER_SUBSCRIPTION'
const DELETE_USER_SUBSCRIPTION = 'DELETE_USER_SUBSCRIPTION'
const GET_USER_SUBSCRIPTIONS = 'GET_USER_SUBSCRIPTIONS'
const GET_SUBSCRIPTION_SCOPES = 'GET_SUBSCRIPTION_SCOPES'
const APPROVE_SUBSCRIPTION = 'APPROVE_SUBSCRIPTION'

export const createUserSubscription = createRequestActions(CREATE_USER_SUBSCRIPTION, createUserSubscriptionRequest)
export const deleteUserSubscription = createRequestActions(DELETE_USER_SUBSCRIPTION, deleteUserSubscriptionRequest)
export const getUserSubscriptions = createRequestActions(GET_USER_SUBSCRIPTIONS, getUserSubscriptionsRequest)
export const getSubscriptionScopes = createRequestActions(GET_SUBSCRIPTION_SCOPES, getSubscriptionScopesRequest)
export const approveSubscription = createRequestActions(APPROVE_SUBSCRIPTION, createSubscriptionApproveRequest)
