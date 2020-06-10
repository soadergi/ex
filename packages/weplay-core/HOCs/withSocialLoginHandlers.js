import i18n from 'i18n-react'
import * as R from 'ramda'
import {
  compose,
  withHandlers,
} from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import withModal from 'weplay-singleton/ModalsProvider/withModal'

import {
  isAuthorizedForLanTicketSelector,
  isTournamentBetaPlayerSelector,
  isTournamentDota2BetaPlayerSelector,
} from 'weplay-core/reduxs/_legacy/modals/reducer'
import { currentLanguageSelector, i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { getUserNotifications } from 'weplay-core/reduxs/notifications/actions'
import { getUserWallet } from 'weplay-core/reduxs/wallets/actions'
import toaster, { TOAST_TYPE } from 'weplay-core/services/toastNotifications'
import { createVote } from 'weplay-core/reduxs/votingOptions/actions'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import afterLoginAction from 'weplay-core/helpers/afterLoginAction'

import { emailAlreadyExistsCode, emailAlreadyExistsCode2 } from '../consts/authErrorCodeMap'

const withSocialLoginHandlers = ({
  socialErrorKey,
}) => compose(
  withRouteInfo,
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    currentLanguage: currentLanguageSelector,
    isTournamentBetaPlayer: isTournamentBetaPlayerSelector,
    isTournamentDota2BetaPlayer: isTournamentDota2BetaPlayerSelector,
    isAuthorizedForLanTicket: isAuthorizedForLanTicketSelector,
  }), {
    // actionCreators
    postVote: createVote.request,
    getUserWallet: getUserWallet.request,
    getUserNotifications: getUserNotifications.request,
  }),
  withModal('signUp'),
  withModal('login'),
  withHandlers({
    getSocialErrorHandler: () => socialName => (error) => {
      const errorCode = R.path(['response', 'data', 'error', 'code'], error)
      if (errorCode === emailAlreadyExistsCode || errorCode === emailAlreadyExistsCode2) {
        toaster.showNotification({
          type: TOAST_TYPE.ERROR,
          content: i18n.translate(
            `serverErrors.${socialErrorKey}`,
            { socialName },
          ),
        })
      }
      return Promise.reject(error)
    },
    getSocialLoginSuccessHandler: props => socialName => () => {
      const {
        history,
        isTournamentBetaPlayer,
        isTournamentDota2BetaPlayer,
        isAuthorizedForLanTicket,
        currentLanguage,
        postVote,
        signUpModal,
        loginModal,
      } = props

      const patchBody = {
        lang: currentLanguage,
        ...isTournamentBetaPlayer && {
          is_tournament_beta_player: true,
        },
        ...isTournamentDota2BetaPlayer && {
          is_tournament_dota2_beta_player: true,
        },
        ...isAuthorizedForLanTicket && {
          lan_ticket_participant: true,
        },
      }
      props.updateUser({
        body: patchBody,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      afterLoginAction(history, postVote, () => {
        signUpModal.hide()
        loginModal.hide()
      })

      // TODO: @Andrew, @Artem, need to move these requests at one place and use it for anyone afterLogin action
      props.getUserWallet()
      props.getUserNotifications({
        params: {
          'page[offset]': 0,
          'page[limit]': 20,
          sort: '-create_datetime',
        },
      })

      props.logAuthEvent(socialName)
    },

  }),
)

export default withSocialLoginHandlers
