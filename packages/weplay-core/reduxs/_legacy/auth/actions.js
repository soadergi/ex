import { createRequestActions } from '../../_factories/request/createRequestActions'
import config from '../../../config'
import {
  createRequestFunc,
  createRequestTypes,
} from '../reduxHelpers'

import {
  validateUserNickNameRequest,
  generateChangeEmailCodeRequest,
  changeEmailRequest,
} from './requests'

// USER FLOW
export const CHANGE_PASS = createRequestTypes('USER/CHANGE_PASS')
export const VERIFY_EMAIL = createRequestTypes('USER/VERIFY_EMAIL')
export const VERIFY_PASS = createRequestTypes('USER/VERIFY_PASS')
export const GET_USER = createRequestTypes('USER/GET_USER')
export const DELETE_USER = createRequestTypes('USER/DELETE_USER')
export const UPDATE_USER = createRequestTypes('USER/UPDATE_USER')
export const FORGOT_PASS = createRequestTypes('USER/FORGOT_PASS')
export const UPLOAD_FILE = createRequestTypes('USER/UPLOAD_FILE')
// LOGIN FLOW
export const SIGN_IN = createRequestTypes('AUTH/SIGN_IN')
export const SIGN_OUT = createRequestTypes('AUTH/SIGN_OUT')

// PROMO CODES
export const GET_USER_PROMOCODES = createRequestTypes('USER/GET_USER_PROMOCODES')
export const getUserPromoCodes = createRequestFunc(
  GET_USER_PROMOCODES,
  'get',
  `${config.promoApi.url}/activations/me`,
)
export const changePassword = createRequestFunc(
  CHANGE_PASS,
  'post',
  `${config.authApi.url}/v1/users/change-password`,
)
export const verifyUserEmail = createRequestFunc(
  VERIFY_EMAIL,
  'post',
  `${config.UMSApi.url}/v1/users/verify/{code}`,
)
export const verifyUserPassword = createRequestFunc(
  VERIFY_PASS,
  'post',
  `${config.UMSApi.url}/v1/passwords/verify/{code}`,
)
export const updateUser = createRequestFunc(
  UPDATE_USER,
  'patch',
  `${config.UMSApi.url}/v1/users/me`,
)
export const getUser = createRequestFunc(
  GET_USER,
  'get',
  `${config.UMSApi.url}/v1/users/me`,
)
export const deleteUser = createRequestFunc(
  DELETE_USER,
  'delete',
  `${config.UMSApi.url}/v1/users/me`,
)
export const sendForgotPassLink = createRequestFunc(
  FORGOT_PASS,
  'post',
  `${config.UMSApi.url}/v1/passwords/reset`,
)
export const uploadFile = createRequestFunc(
  UPLOAD_FILE,
  'post',
  `${config.staticApi.url}/file`,
)

const synchronousGetUserRequest = { url: `${config.UMSApi.url}/v1/users/me`, method: 'get' }
export const signIn = createRequestFunc(
  SIGN_IN,
  'post',
  `${config.authApi.url}/v1/auth`, null,
  synchronousGetUserRequest,
)

export const signOut = createRequestFunc(
  SIGN_OUT,
  'post',
  'logout',
)

// SOCIAL LOGIN
export const GOOGLE_LOGIN = createRequestTypes('AUTH/GOOGLE_LOGIN')
export const GOOGLE_LINK = createRequestTypes('AUTH/GOOGLE_LINK')
export const FACEBOOK_LOGIN = createRequestTypes('AUTH/FACEBOOK_LOGIN')
export const FACEBOOK_LINK = createRequestTypes('AUTH/FACEBOOK_LINK')
export const OAUTH2_LOGIN = createRequestTypes('AUTH/OAUTH2_LOGIN')
export const OAUTH2_LINK = createRequestTypes('AUTH/OAUTH2_LINK')

export const facebookLogin = createRequestFunc(
  FACEBOOK_LOGIN,
  'get',
  `${config.authApi.url}/v1/social/facebook?access_token={accessToken}`,
  null,
  synchronousGetUserRequest,
)
export const facebookLink = createRequestFunc(
  FACEBOOK_LINK,
  'post',
  `${config.authApi.url}/v1/social/facebook?access_token={accessToken}`,
  synchronousGetUserRequest,
)
export const googleLogin = createRequestFunc(
  GOOGLE_LOGIN,
  'get',
  `${config.authApi.url}/v1/social/google?access_token={accessToken}`, null,
  synchronousGetUserRequest,
)
export const googleLink = createRequestFunc(
  GOOGLE_LINK,
  'post',
  `${config.authApi.url}/v1/social/google?access_token={accessToken}`, null,
  synchronousGetUserRequest,
)
export const oauth2Login = createRequestFunc(
  OAUTH2_LOGIN,
  'get',
  `${config.authApi.url}/v1/social/{source}?code={code}&redirect_uri={redirect_uri}`, null,
  synchronousGetUserRequest,
)
export const oauth2Link = createRequestFunc(
  OAUTH2_LINK,
  'post',
  `${config.authApi.url}/v1/social/{source}?code={code}&redirect_uri={redirect_uri}`, null,
  synchronousGetUserRequest,
)

//  NEW REGISTRATION
export const GENERATE_REGISTRATION_CODE = createRequestTypes('USER/GENERATE_REGISTRATION_CODE')
export const generateRegistrationCode = createRequestFunc(
  GENERATE_REGISTRATION_CODE,
  'post',
  `${config.authApi.url}/v1/codes/generate-registration-code`,
)
export const CREATE_NEW_USER = createRequestTypes('USER/CREATE_NEW_USER')
export const createNewUser = createRequestFunc(
  CREATE_NEW_USER,
  'post',
  `${config.authApi.url}/v1/users/create`,
  null,
  synchronousGetUserRequest,
)

// NEW FORGOT PASSWORD
export const GENERATE_FORGOT_PASSWORD_CODE = createRequestTypes('USER/GENERATE_FORGOT_PASSWORD_CODE')
export const generateForgotPasswordCode = createRequestFunc(
  GENERATE_FORGOT_PASSWORD_CODE,
  'post',
  `${config.authApi.url}/v1/codes/generate-forgot-password-code`,
)
export const RESET_PASSWORD = createRequestTypes('USER/RESET_PASSWORD')
export const resetPassword = createRequestFunc(
  RESET_PASSWORD,
  'post',
  `${config.authApi.url}/v1/users/reset-password`,
)

// VALIDATION CODES
export const VALIDATE_EMAIL_CODE = createRequestTypes('USER/VALIDATE_EMAIL_CODE')
export const validateEmailCode = createRequestFunc(
  VALIDATE_EMAIL_CODE,
  'post',
  `${config.authApi.url}/v1/codes/validate-code`,
)
export const VALIDATE_REGISTRATION_CODE = createRequestTypes('USER/VALIDATE_REGISTRATION_CODE')
export const validateRegistrationCode = createRequestFunc(
  VALIDATE_REGISTRATION_CODE,
  'post',
  `${config.authApi.url}/v1/codes/validate-code`,
)

export const DISABLE_USER_SOCIAL = createRequestTypes('USER/DISABLE_USER_SOCIAL')
export const disableUserSocial = createRequestFunc(
  DISABLE_USER_SOCIAL,
  'delete',
  `${config.authApi.url}/v1/social?type={social_type}`, null,
  synchronousGetUserRequest,
)

const VALIDATE_USER_NICKNAME = 'VALIDATE_USER_NICKNAME'
export const validateUserNickName = createRequestActions(VALIDATE_USER_NICKNAME, validateUserNickNameRequest)

const GENERATE_CHANGE_EMAIL_CODE = 'GENERATE_CHANGE_EMAIL_CODE'
export const generateChangeEmailCode = createRequestActions(GENERATE_CHANGE_EMAIL_CODE, generateChangeEmailCodeRequest)

const CHANGE_USER_EMAIL = createRequestTypes('USER/CHANGE_USER_EMAIL')
export const changeUserEmail = createRequestActions(CHANGE_USER_EMAIL, changeEmailRequest)
