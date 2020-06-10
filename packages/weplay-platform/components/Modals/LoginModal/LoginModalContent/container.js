import * as R from 'ramda'
import {
  compose,
  withHandlers,
  withProps,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'
import withModal from 'weplay-singleton/ModalsProvider/withModal'

import { readNews } from 'weplay-core/reduxs/news/actions'
import {
  setTemporaryUserEmail,
} from 'weplay-core/reduxs/_legacy/modals/actions'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import { signIn, updateUser } from 'weplay-core/reduxs/_legacy/auth/actions'
import {
  isIntelligenceParticipantSelector,
  isAgilityParticipantSelector,
  isAuthorizedForLanTicketSelector,
  isTournamentBetaPlayerSelector,
  isTournamentDota2BetaPlayerSelector,
  isBellSourceSelector,
} from 'weplay-core/reduxs/_legacy/modals/reducer'
import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import {
} from 'weplay-core/reduxs/language/reducer'
import withAuthService from 'weplay-core/HOCs/withAuthService'
import { getUserNotifications } from 'weplay-core/reduxs/notifications/actions'
import { getUserWallet } from 'weplay-core/reduxs/wallets/actions'
import { newsIdsSelector } from 'weplay-core/reduxs/news/reducer'

import { loginAndPatchUser, loginAndRedirectToPrevPage } from './actionChains'

const container = compose(
  withAnalytics,
  connect(createStructuredSelector({
    isAgilityParticipant: isAgilityParticipantSelector,
    isIntelligenceParticipant: isIntelligenceParticipantSelector,
    isTournamentBetaPlayer: isTournamentBetaPlayerSelector,
    isTournamentDota2BetaPlayer: isTournamentDota2BetaPlayerSelector,
    isAuthorizedForLanTicket: isAuthorizedForLanTicketSelector,
    isBellSource: isBellSourceSelector,
    currentUser: currentUserSelector,
    newsIds: newsIdsSelector,
  }), {
    updateUser,
    signIn,
    setUserEmail: setTemporaryUserEmail,
    loginAndPatchUser,
    loginAndRedirectToPrevPage,
    getUserNotifications: getUserNotifications.request,
    getUserWallet: getUserWallet.request,
    readNews: readNews.request,
  }),
  withLocale,
  withAuthService,
  withModal('signUp'),
  withModal('login'),
  withHandlers({
    logAuthEvent: ({
      logAnalytics,
    }) => (socialName) => {
      logAnalytics({
        eventCategory: 'Interactions',
        eventAction: 'login',
        eventLabel: socialName,
      })
    },
    handleOnSignIn: ({
      logAnalytics,
      triggerLogin,
      getUserNotifications, // eslint-disable-line no-shadow
      getUserWallet, // eslint-disable-line no-shadow
      locale,
      readNews, // eslint-disable-line no-shadow
      newsIds,
    }) => () => {
      getUserWallet()
      getUserNotifications({
        params: {
          'page[offset]': 0,
          'page[limit]': 20,
          sort: '-create_datetime',
        },
      })
      readNews({
        language: locale,
        targetIds: newsIds.join(','),
        detailed: 1,
      })
      triggerLogin()
      logAnalytics({
        eventCategory: 'Interactions',
        eventAction: 'logIn',
        eventLabel: 'form',
      })
    },
    closePopup: ({
      loginModal,
      signUpModal,
    }) => () => {
      loginModal.hide()
      signUpModal.hide()
    },

  }),
  withProps({
    step: 'signInStep',
  }),
  withHandlers({
    handleRedirectToForgotPassword: props => () => {
      props.handleClose()
      props.triggerForgotPass()
      props.logAnalytics({
        eventCategory: 'Forgot password',
        eventAction: 'Forgot password?',
        eventLabel: 'Login popup',
      })
    },

    handleRedirectToSignUp: props => () => {
      props.handleClose()
      props.triggerSignUp({ isBellSource: props.isBellSource })
    },

    handleSubmit: props => (values) => {
      props.setUserEmail({ email: values.email })
      const patchBody = {
        ...props.isTournamentBetaPlayer && {
          is_tournament_beta_player: true,
        },
        ...props.isTournamentDota2BetaPlayer && {
          is_tournament_dota2_beta_player: true,
        },
        ...props.isAuthorizedForLanTicket && {
          lan_ticket_participant: true,
        },
      }
      if (!R.isEmpty(patchBody)) {
        props.loginAndPatchUser({
          values: {
            email: values.email,
            password: values.password,
          },
          body: patchBody,
        }).then(props.handleOnSignIn)
          .catch(props.handleAuthError)
      } else if (props.isAgilityParticipant || props.isIntelligenceParticipant) {
        // TODO: remove all this legace tournament stuff about login and sign up
        props.loginAndPatchUser({
          values: {
            email: values.email,
            password: values.password,
          },
          body: {},
        }).then(props.handleOnSignIn)
          .catch(props.handleAuthError)
      } else {
        const {
          history,
          closePopup,
        } = props
        props.loginAndRedirectToPrevPage({
          values: {
            email: values.email,
            password: values.password,
          },
          params: {
            ...props.isBellSource && {
              is_bell_source: true,
            },
          },
          history,
          closePopup,
        })
          .then(props.handleOnSignIn)
          .catch(props.handleAuthError)
      }
    },
  }),
)

export default container
