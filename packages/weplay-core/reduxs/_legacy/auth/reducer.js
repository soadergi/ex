/* eslint-disable max-lines */
import * as R from 'ramda'
import { createSelector } from 'reselect'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

import { $prop } from 'weplay-core/$utils/$prop'
import { $propEq } from 'weplay-core/$utils/$propEq'
import { cancelPremium } from 'weplay-core/reduxs/premiums/actions'
import { ERROR_CODES } from 'weplay-core/consts/errorCodes'

import {
  CHANGE_PASS,
  CREATE_NEW_USER,
  DISABLE_USER_SOCIAL,
  GENERATE_FORGOT_PASSWORD_CODE,
  GENERATE_REGISTRATION_CODE,
  GET_USER,
  GET_USER_PROMOCODES,
  FACEBOOK_LOGIN,
  FACEBOOK_LINK,
  GOOGLE_LOGIN,
  GOOGLE_LINK,
  OAUTH2_LOGIN,
  OAUTH2_LINK,
  SIGN_IN,
  SIGN_OUT,
  UPDATE_USER,
  VALIDATE_EMAIL_CODE,
  VALIDATE_REGISTRATION_CODE,
} from './actions'

const initialState = {
  currentUser: null,
  error: null,
  userInitialValues: {
    user: {
      nickname: '',
      firstName: '',
      lastName: '',
      email: '',
      emailMe: false,
      userPromoCodes: [],
      code: '',
      avatarPath: '',
      gender: '',
      birthDate: '',
    },
    changePass: {
      oldPass: '',
      newPass: '',
      confirmPass: '',
    },
  },
  subscribedUser: false,
  step: '',
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN.SUCCESS:
    case FACEBOOK_LOGIN.SUCCESS:
    case GOOGLE_LOGIN.SUCCESS:
    case OAUTH2_LOGIN.SUCCESS:
    case FACEBOOK_LINK.SUCCESS:
    case GOOGLE_LINK.SUCCESS:
    case OAUTH2_LINK.SUCCESS:
    case DISABLE_USER_SOCIAL.SUCCESS:
    case GET_USER.SUCCESS: {
      const user = action.payload.data.data
      return {
        ...state,
        currentUser: user,
        userInitialValues: {
          ...state.userInitialValues,
          user: {
            ...state.userInitialValues.user,
            email: user.email,
            nickname: user.nickname || '',
            firstName: user.first_name || '',
            lastName: user.last_name || '',
            avatarPath: user.avatar_path || '',
            birthDate: user.birth_date,
            gender: user.gender,
          },
        },
      }
    }
    case cancelPremium.SUCCESS: {
      return R.assocPath(
        ['currentUser', 'enable_auto_extend'],
        false,
        state,
      )
    }
    case UPDATE_USER.SUCCESS: {
      const patchedPartialUser = action.requestData
      return {
        ...state,
        // TODO: @ILLIA REFACTOR
        currentUser: {
          ...state.currentUser,
          first_name: patchedPartialUser.first_name || state.currentUser.first_name,
          last_name: patchedPartialUser.last_name || state.currentUser.last_name,
          avatar_path: patchedPartialUser.avatar_path || state.currentUser.avatar_path,
          birth_date: patchedPartialUser.birth_date || state.currentUser.birth_date,
          nickname: patchedPartialUser.nickname || state.currentUser.nickname,
          gender: patchedPartialUser.gender || state.currentUser.gender,
          agility_participant: patchedPartialUser.agility_participant
            || state.currentUser.agility_participant
            || false,
          intelligence_participant: patchedPartialUser.intelligence_participant
            || state.currentUser.intelligence_participant
            || false,
          is_tournament_beta_player: patchedPartialUser.is_tournament_beta_player
            || state.currentUser.is_tournament_beta_player
            || false,
          is_tournament_dota2_beta_player: patchedPartialUser.is_tournament_dota2_beta_player
            || state.currentUser.is_tournament_dota2_beta_player
            || false,
          lan_ticket_participant: patchedPartialUser.lan_ticket_participant
            || state.currentUser.lan_ticket_participant
            || false,
          selected_media_tags: patchedPartialUser.selected_media_tags,
        },
        userInitialValues: {
          ...state.userInitialValues,
          user: {
            ...state.userInitialValues.user,
            firstName: patchedPartialUser.first_name || state.currentUser.first_name || '',
            lastName: patchedPartialUser.last_name || state.currentUser.last_name || '',
            avatarPath: patchedPartialUser.avatar_path || state.currentUser.avatar_path || '',
            birthDate: patchedPartialUser.birth_date || state.currentUser.birth_date || '',
            nickname: patchedPartialUser.nickname || state.currentUser.nickname || '',
            gender: patchedPartialUser.gender || state.currentUser.gender || '',
          },
        },
      }
    }
    case CHANGE_PASS.SUCCESS: {
      // TODO: ILLIA handle this with websockets as well
      const passInfo = action.requestData
      return {
        ...state,
        currentUser: { ...state.currentUser },
        userInitialValues: {
          ...state.userInitialValues,
          user: {
            ...state.userInitialValues.user,
          },
          changePass: {
            ...state.userInitialValues.changePass,
            newPass: passInfo.password,
            confirmPass: passInfo.retry_password,
          },
        },
      }
    }
    case GENERATE_FORGOT_PASSWORD_CODE.SUCCESS:
    case GENERATE_REGISTRATION_CODE.SUCCESS: {
      return {
        ...state,
        userInitialValues: {
          user: {
            ...state.user,
            email: action.requestData.email,
          },
        },
        error: null,
      }
    }
    case CREATE_NEW_USER.SUCCESS: {
      return {
        ...state,
        userInitialValues: {
          user: {
            ...state.user,
            email: action.payload.data.data.email,
            nickname: action.payload.data.data.nickname,
            password: action.payload.data.data.password,
            firstName: '',
            lastName: '',
            agility_participant: action.payload.data.data.agility_participant || false,
            intelligence_participant: action.payload.data.data.intelligence_participant || false,
            is_tournament_beta_player: action.payload.data.data.is_tournament_beta_player || false,
            is_tournament_dota2_beta_player: action.payload.data.data.is_tournament_dota2_beta_player || false,
            lan_ticket_participant: action.payload.data.data.lan_ticket_participant || false,
          },
        },
        error: null,
      }
    }
    case VALIDATE_EMAIL_CODE.SUCCESS:
    case VALIDATE_REGISTRATION_CODE.SUCCESS: {
      return {
        ...state,
        userInitialValues: {
          user: {
            ...state.user,
            code: action.requestData.code,
            email: action.requestData.email,
          },
        },
      }
    }
    case SIGN_OUT.SUCCESS: {
      return {
        ...state,
        ...initialState,
      }
    }
    case GET_USER_PROMOCODES.ERROR: {
      const { message, code } = action.payload
      // TODO: BE FIX - WRONG CODE
      return message === 'Access Denied.' && code === 0
        ? { ...initialState }
        : state
    }
    case GET_USER.ERROR: {
      const errorCode = action.payload?.code
      return errorCode === ERROR_CODES.UNAUTHORIZED
        ? { ...initialState }
        : state
    }
    case GET_USER_PROMOCODES.SUCCESS: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          userPromoCodes: {
            ...state.userPromoCodes,
            promoCodesList: action.payload.data.data,
            count: action.payload.data.pagination_info.count,
          },
        },
      }
    }
    default:
      return state
  }
}

export const AUTH_RN = 'Auth'

const persistConfig = {
  key: AUTH_RN,
  storage,
  whitelist: ['currentUser'],
}

export default persistReducer(persistConfig, authReducer)
const authSelector = R.prop(AUTH_RN)
export const currentUserSelector = createSelector(
  [authSelector],
  R.propOr(null, 'currentUser'),
)

export const isLoggedInSelector = createSelector(
  [currentUserSelector],
  R.pipe(
    R.prop('id'),
    Boolean,
  ),
)
export const userIdSelector = createSelector(
  [currentUserSelector],
  R.prop('id'),
)
export const isSteamConnectedSelector = createSelector(
  [currentUserSelector],
  R.pipe(
    R.prop('steam_id'),
    Boolean,
  ),
)
export const currentUserSteamIdSelector = createSelector(
  [currentUserSelector],
  $prop('steam_id'),
)
export const userBackgroundAvatarSelector = createSelector(
  [currentUserSelector],
  $prop('background_avatar'),
)
export const userRegistrationDateSelector = createSelector(
  [currentUserSelector],
  $prop('registration_date'),
)
export const userInitialValuesSelector = createSelector(
  [authSelector],
  R.prop('userInitialValues'),
)
export const userSocialInfoSelector = createSelector(
  [currentUserSelector],
  R.propOr([], 'social_infos'),
)
export const isDiscordConnectedSelector = createSelector(
  [userSocialInfoSelector],
  R.find($propEq('type', 'DISCORD')),
)
export const userEmailSelector = createSelector(
  [currentUserSelector],
  R.prop('email'),
)
export const isUserAdminSelector = createSelector(
  [currentUserSelector],
  R.propOr(false, 'is_admin'),
)
export const isUserHasTicketsManagementRightsSelector = createSelector(
  [currentUserSelector],
  // This key is used because it already existed on backend, but was not used any more on frontend
  R.propOr(false, 'next_artifact_participant'),
)
export const isPremiumSelector = createSelector(
  [currentUserSelector],
  R.propOr(false, 'is_premium_account'),
)
export const isAutoExtendPremiumEnabledSelector = createSelector(
  [currentUserSelector],
  R.propOr(false, 'enable_auto_extend'),
)
export const expirePremiumAccountDateSelector = createSelector(
  [currentUserSelector],
  R.propOr('', 'expired_premium_account_date'),
)

export const isPatchedTournamentDota2BetaPlayerSelector = createSelector(
  [currentUserSelector],
  R.pipe(
    R.path(['is_tournament_dota2_beta_player']),
    Boolean,
  ),
)

export const lanTicketParticipantSelector = createSelector(
  [currentUserSelector],
  R.pipe(
    R.path(['lan_ticket_participant']),
    Boolean,
  ),
)
export const userMediaTagsSelector = createSelector(
  [currentUserSelector],
  $prop('selected_media_tags') ?? {},
)
