import * as R from 'ramda'
import {
  compose,
  withHandlers,
  withPropsOnChange,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withModal from 'weplay-singleton/ModalsProvider/withModal'
import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { createVote } from 'weplay-core/reduxs/votingOptions/actions'
import afterLoginAction from 'weplay-core/helpers/afterLoginAction'
import { userInitialValuesSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { isSignUpModalVisibileSelector } from 'weplay-core/reduxs/_legacy/modals/reducer'
import { setTemporaryUserEmail, triggerLoginModal, triggerSignUpModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import withAuthService from 'weplay-core/HOCs/withAuthService'
import {
  validateRegistrationCode,
  generateRegistrationCode,
  getUser,
} from 'weplay-core/reduxs/_legacy/auth/actions'

import withEmailForm from 'weplay-platform/HOCs/withEmailForm'

const container = compose(
  withAnalytics,
  withAuthService,
  withLocale,
  connect(createStructuredSelector({
    // selectors
    isShown: isSignUpModalVisibileSelector,
    userInitialValues: userInitialValuesSelector,
  }), {
    // actionCreators
    triggerSignUp: triggerSignUpModal,
    triggerLogin: triggerLoginModal,
    setUserEmail: setTemporaryUserEmail,
    validateRegistrationCode,
    generateRegistrationCode,
    postVote: createVote.request,
    getUser,
  }),
  withStateHandlers({
    step: 'signUpStep1',
  }, {
    goToStep: () => step => ({
      step,
    }),
  }),
  withHandlers({
    logFormAnalytics: ({
      logAnalytics,
    }) => ({
      timingVar,
      timingLabel,
      eventContent,
      eventContext,
      errorCode,
    }) => {
      logAnalytics({
        event: 'weplay_Forms',
        timingVar,
        timingLabel,
        eventContent,
        eventContext,
        errorCode,
      })
    },
  }),
  withHandlers({
    handleClose: ({
      triggerSignUp,
      step,
      logFormAnalytics,
      goToStep,
    }) => () => {
      triggerSignUp()
      logFormAnalytics({
        timingVar: 'leave',
        timingLabel: 'close',
        eventContent: step,
        eventContext: 'send_email',
      })
      goToStep('signUpStep1')
    },
    logAuthEvent: ({
      logAnalytics,
    }) => (socialName) => {
      logAnalytics({
        eventCategory: 'Interactions',
        eventAction: 'form',
        eventLabel: socialName,
      })
    },
    generateEmailCode: props => (values) => {
      props.generateRegistrationCode({
        body: {
          email: values.email,
          lang: props.locale,
        },
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => {
        props.logFormAnalytics({
          timingVar: 'first_step_success',
          timingLabel: 'successful',
          eventContent: 'email',
          eventContext: 'send_email',
        })
        props.goToStep('signUpStep2')
      })
        .catch((reject) => {
          const error = (R.path(['response', 'data', 'error'], reject))
          props.handleAuthError(reject)
          props.logFormAnalytics({
            timingVar: 'first_step_fail',
            timingLabel: 'unsuccessful',
            eventContent: 'email',
            eventContext: 'send_email',
            errorCode: `${error.code} ${error.message}`,
          })
        })
    },
  }),
  withModal('signUp'),
  withHandlers(({
    handleSuccessMessageButtonClick: props => () => {
      props.getUser().then(() => {
        afterLoginAction(props.history, props.postVote, props.signUp.hide)
      })
      props.handleClose()
    },
  })),
  withEmailForm,
  withHandlers({
    handleValidateRegistrationCode: props => (values) => {
      props.validateRegistrationCode({
        body: {
          code: values.code,
          email: props.values.email,
        },
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => {
        props.logFormAnalytics({
          timingVar: 'success',
          timingLabel: 'successful',
          eventContent: 'email',
        })
        props.goToStep('signUpStep3')
      })
        .catch((reject) => {
          const error = (R.path(['response', 'data', 'error'], reject))
          props.handleAuthError(reject)
          props.logFormAnalytics({
            timingVar: 'fail',
            timingLabel: 'unsuccessful',
            eventContent: 'email',
            errorCode: `${error.code} ${error.message}`,
          })
        })
    },
  }),
  // TODO: @khrolikov fix code duplication
  withPropsOnChange([
    'authErrorMessage',
    't',
  ], ({
    authErrorMessage,
    t,
  }) => ({
    serverErrorMessage: authErrorMessage ? t(`serverErrors.${authErrorMessage}`) : '',
  })),
  // ENDTODO:
)

export default container
