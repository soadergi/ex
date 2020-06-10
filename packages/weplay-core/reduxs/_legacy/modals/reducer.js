import { createSelector } from 'reselect'
import * as R from 'ramda'

import {
  SIGN_IN,
  VERIFY_EMAIL,
  FACEBOOK_LOGIN,
  GOOGLE_LOGIN,
  RESET_PASSWORD,
  OAUTH2_LOGIN,
  OAUTH2_LINK,
  GOOGLE_LINK,
  FACEBOOK_LINK,
  changeUserEmail,
  generateChangeEmailCode,
} from '../auth/actions'

import {
  TRIGGER_LOGIN_MODAL_VISIBILITY,
  TRIGGER_FORGOT_PASS_MODAL_VISIBILITY,
  TRIGGER_SIGN_UP_MODAL_VISIBILITY,
  TRIGGER_PROMOCODES_MODAL_VISIBILITY,
  OPEN_LOGIN_MODAL_VISIBILITY,
  TRIGGER_CHANGE_EMAIL_MODAL_VISIBILITY,
  TRIGGER_MUTUAL_MODAL_VISIBILITY,
} from './consts'

const initialState = {
  mutualModal: '',
  loginModalVisibility: false,
  forgotPassModalVisibility: false,
  signUpModalVisibility: false,
  promoCodesModalVisibility: false,
  changeEmailModalVisibility: false,
  signUpSource: '',
  isBellSource: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LOGIN_MODAL_VISIBILITY:
      return {
        ...state,
        loginModalVisibility: true,
        agility_participant: R.pathOr(false, ['payload', 'agility_participant'], action),
        intelligence_participant: R.pathOr(false, ['payload', 'intelligence_participant'], action),
        is_tournament_beta_player: R.pathOr(false, ['payload', 'is_tournament_beta_player'], action),
        is_tournament_dota2_beta_player: R.pathOr(false, ['payload', 'is_tournament_dota2_beta_player'], action),
        lan_ticket_participant: R.pathOr('', ['payload', 'lan_ticket_participant'], action),
        signUpSource: R.pathOr('', ['payload', 'registrationFrom'], action),
        isBellSource: R.pathOr(false, ['payload', 'isBellSource'], action),
        // TODO All step will be removed from reducers after step logic refactor
      }
    case TRIGGER_LOGIN_MODAL_VISIBILITY:
    case VERIFY_EMAIL.SUCCESS:
      return {
        ...state,
        loginModalVisibility: !state.loginModalVisibility,
      }
    case SIGN_IN.SUCCESS:
      return state
    case changeUserEmail.SUCCESS:
      return {
        ...state,
      }
    case generateChangeEmailCode.SUCCESS:
      return {
        ...state,
      }
    case TRIGGER_FORGOT_PASS_MODAL_VISIBILITY:
      return {
        ...state,
        forgotPassModalVisibility: !state.forgotPassModalVisibility,
      }
    case TRIGGER_CHANGE_EMAIL_MODAL_VISIBILITY:
      return {
        ...state,
        changeEmailModalVisibility: !state.changeEmailModalVisibility,
      }
    case TRIGGER_SIGN_UP_MODAL_VISIBILITY:
      return {
        ...state,
        signUpModalVisibility: !state.signUpModalVisibility,
        signUpSource: R.pathOr(state.signUpSource, ['payload', 'registrationFrom'], action),
        isBellSource: R.pathOr(false, ['payload', 'isBellSource'], action),
      }
    case TRIGGER_PROMOCODES_MODAL_VISIBILITY:
      return {
        ...state,
        promoCodesModalVisibility: action.payload,
      }
    case FACEBOOK_LOGIN.SUCCESS:
    case FACEBOOK_LINK.SUCCEESS:
    case GOOGLE_LINK.SUCCEESS:
    case GOOGLE_LOGIN.SUCCESS:
    case OAUTH2_LOGIN.SUCCESS:
    case OAUTH2_LINK.SUCCESS:
      return {
        ...state,
        loginModalVisibility: false,
        signUpModalVisibility: false,
      }
    case RESET_PASSWORD.SUCCESS: {
      return {
        ...state,
      }
    }
    case TRIGGER_MUTUAL_MODAL_VISIBILITY: {
      return {
        ...state,
        mutualModal: action.payload,
      }
    }
    default:
      return state
  }
}
export const MODALS_RN = 'MODALS'
const modalsSelector = R.prop(MODALS_RN)

export const signUpSourceSelector = createSelector(
  [modalsSelector],
  R.prop('signUpSource'),
)

export const isBellSourceSelector = createSelector(
  [modalsSelector],
  R.prop('isBellSource'),
)

export const isAgilityParticipantSelector = createSelector(
  [modalsSelector],
  R.prop('agility_participant'),
)

export const isIntelligenceParticipantSelector = createSelector(
  [modalsSelector],
  R.prop('intelligence_participant'),
)

export const isTournamentBetaPlayerSelector = createSelector(
  [modalsSelector],
  R.prop('is_tournament_beta_player'),
)

export const isTournamentDota2BetaPlayerSelector = createSelector(
  [modalsSelector],
  R.prop('is_tournament_dota2_beta_player'),
)

export const isAuthorizedForLanTicketSelector = createSelector(
  [modalsSelector],
  R.prop('lan_ticket_participant'),
)

export const isPromoCodesModalVisibileSelector = createSelector(
  [modalsSelector],
  R.prop('promoCodesModalVisibility'),
)
export const isLoginModalVisibileSelector = createSelector(
  [modalsSelector],
  R.prop('loginModalVisibility'),
)
export const isSignUpModalVisibileSelector = createSelector(
  [modalsSelector],
  R.prop('signUpModalVisibility'),
)
export const isForgotPassModalVisibileSelector = createSelector(
  [modalsSelector],
  R.prop('forgotPassModalVisibility'),
)
export const isChangeEmailModalVisibileSelector = createSelector(
  [modalsSelector],
  R.prop('changeEmailModalVisibility'),
)
export const signUpStepSelector = createSelector(
  [modalsSelector],
  R.prop('step'),
)

export const mutualModalSelector = createSelector(
  [modalsSelector],
  R.prop('mutualModal'),
)
