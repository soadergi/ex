import * as R from 'ramda'
import {
  compose,
  withHandlers,
  withPropsOnChange,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { userSocialInfoSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { isForgotPassModalVisibileSelector } from 'weplay-core/reduxs/_legacy/modals/reducer'
import {
  triggerForgotPassModal,
  triggerSignUpModal,
} from 'weplay-core/reduxs/_legacy/modals/actions'
import {
  sendForgotPassLink,
  disableUserSocial,
  validateEmailCode,
  generateForgotPasswordCode,
} from 'weplay-core/reduxs/_legacy/auth/actions'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import withAuthService from 'weplay-core/HOCs/withAuthService'
import withEmailForm from 'weplay-platform/HOCs/withEmailForm'
import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

const container = compose(
  withAnalytics,
  withAuthService,
  withLocale,
  connect(createStructuredSelector({
    // selectors
    forgotPassVisibility: isForgotPassModalVisibileSelector,
    userSocialInfo: userSocialInfoSelector,
  }), {
    // actionCreators
    triggerForgotPass: triggerForgotPassModal,
    triggerSignUp: triggerSignUpModal,
    sendForgotPassLink,
    disableUserSocial,
    validateEmailCode,
    generateForgotPasswordCode,
  }),
  withStateHandlers({
    step: 'forgotPassStep1',
  }, {
    goToStep: () => step => ({
      step,
    }),
  }),
  withHandlers({
    handleClose: props => () => {
      props.triggerForgotPass()
      props.goToStep('forgotPassStep1')
    },
    disableUserSocial: props => (socialName) => {
      props.disableUserSocial({
        social_type: socialName.toUpperCase(),
      })
    },
    generateEmailCode: props => (values) => {
      props.generateForgotPasswordCode({
        body: {
          email: values.email,
          lang: props.locale,
        },
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => props.goToStep('forgotPassStep2'))
        .catch(props.handleAuthError)
    },
  }),
  withEmailForm,
  withHandlers({
    handleValidateForgotPasswordCode: props => (values) => {
      props.validateEmailCode({
        body: {
          email: props.values.email,
          code: values.code,
        },
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => props.goToStep('forgotPassStep3'))
        .catch(props.handleAuthError)
    },
  }),
  withHandlers({
    handleSuccessMessageButtonClick: props => () => {
      if (!R.isEmpty(props.userSocialInfo)) {
        props.disableUserSocial(props.userSocialInfo[0].type)
      }
      props.handleClose()
    },
  }),
  withPropsOnChange([
    'step',
    'history',
  ], ({
    step,
    history,
  }) => ({
    actionType: R.contains('/cabinet/profile', history.location.pathname)
    && step === 'forgotPassStep1' ? 'setPassword' : step,
  })),
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
