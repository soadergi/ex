import { createReduxAction } from '../reduxHelpers'

import {
  TRIGGER_LOGIN_MODAL_VISIBILITY,
  TRIGGER_FORGOT_PASS_MODAL_VISIBILITY,
  TRIGGER_SIGN_UP_MODAL_VISIBILITY,
  SET_TEMPORARY_USER_EMAIL,
  TRIGGER_PROMOCODES_MODAL_VISIBILITY,
  OPEN_LOGIN_MODAL_VISIBILITY,
  TRIGGER_CHANGE_EMAIL_MODAL_VISIBILITY,
  TRIGGER_MUTUAL_MODAL_VISIBILITY,
} from './consts'

export const triggerLoginModal = createReduxAction(TRIGGER_LOGIN_MODAL_VISIBILITY)
export const triggerChangeEmailModal = createReduxAction(TRIGGER_CHANGE_EMAIL_MODAL_VISIBILITY)

export const openLoginModal = tournamentRegistrationValue => (dispatch) => {
  dispatch({
    type: OPEN_LOGIN_MODAL_VISIBILITY,
    payload: tournamentRegistrationValue,
  })
}

export const triggerForgotPassModal = createReduxAction(TRIGGER_FORGOT_PASS_MODAL_VISIBILITY)

export const setTemporaryUserEmail = createReduxAction(SET_TEMPORARY_USER_EMAIL)

export const triggerPromoCodesModal = isVisible => (dispatch) => {
  dispatch({
    type: TRIGGER_PROMOCODES_MODAL_VISIBILITY,
    payload: isVisible,
  })
}

export const triggerSignUpModal = registrationFrom => (dispatch) => {
  dispatch({
    type: TRIGGER_SIGN_UP_MODAL_VISIBILITY,
    payload: registrationFrom,
  })
}

export const triggerMutualModal = modalName => dispatch => dispatch({
  type: TRIGGER_MUTUAL_MODAL_VISIBILITY,
  payload: modalName || '',
})
