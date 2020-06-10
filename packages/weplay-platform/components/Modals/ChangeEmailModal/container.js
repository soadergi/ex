import * as R from 'ramda'
import {
  branch,
  compose,
  renderNothing,
  withHandlers,
  withPropsOnChange,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { currentUserSelector, userInitialValuesSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import {
  triggerChangeEmailModal,
} from 'weplay-core/reduxs/_legacy/modals/actions'
import {
  signUpStepSelector,
  isChangeEmailModalVisibileSelector,
} from 'weplay-core/reduxs/_legacy/modals/reducer'
import {
  sendForgotPassLink,
  disableUserSocial,
  signIn,
  generateChangeEmailCode,
  changeUserEmail,
  getUser,
} from 'weplay-core/reduxs/_legacy/auth/actions'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import withAuthService from 'weplay-core/HOCs/withAuthService'
import toaster, { TOAST_TYPE } from 'weplay-core/services/toastNotifications'
import withEmailForm from 'weplay-platform/HOCs/withEmailForm'

const container = compose(
  withAnalytics,
  withAuthService,
  withEmailForm,
  connect(createStructuredSelector({
    // selectors
    step: signUpStepSelector,
    globalScope: globalScopeSelector,
    changeEmailModalVisibility: isChangeEmailModalVisibileSelector,
    currentUser: currentUserSelector,
    userInitialValues: userInitialValuesSelector,
  }), {
    // actionCreators
    sendForgotPassLink,
    disableUserSocial,
    triggerChangeEmailModal,
    signIn,
    generateChangeEmailCode: generateChangeEmailCode.request,
    changeUserEmail: changeUserEmail.request,
    getUser,
  }),
  withStateHandlers({
    saveSubscriptions: false,
    step: 'changeEmailStep1',
  }, {
    approveSaveSubscriptions: () => () => ({
      saveSubscriptions: true,
    }),
    declineSaveSubscriptions: () => () => ({
      saveSubscriptions: false,
    }),
    goToStep: () => step => ({
      step,
    }),
  }),
  withHandlers({
    handleEmailPasswordFormSubmit: props => (values) => {
      props.signIn({
        body: {
          password: values.password,
          email: values.email,
        },
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => props.goToStep('changeEmailStep2'))
        .catch(props.handleAuthError)
    },
    handleClose: props => () => {
      props.triggerChangeEmailModal()
      props.goToStep('changeEmailStep1')
    },
    generateEmailCode: props => (values) => {
      props.generateChangeEmailCode({
        params: {
          new_email: values.email,
          lang: props.locale,
        },
      }).then(() => props.goToStep('changeEmailStep3'))
        .catch(props.handleAuthError)
    },
  }),
  withHandlers({
    handleSuccessMessageButtonClick: props => () => {
      props.getUser()
      props.handleClose()
      toaster.showNotification({
        type: TOAST_TYPE.SUCCESS,
        content: props.t('mediaCore.notifications.success.emailChanged'),
      })
    },
  }),
  withEmailForm,
  withHandlers({
    handleValidateChangeEmailCode: props => (values) => {
      props.changeUserEmail({
        params: {
          new_email: props.values.email,
          code: values.code,
          transfer_subscriptions: props.saveSubscriptions,
        },
      }).then(() => props.goToStep('changeEmailStep5'))
        .catch(props.handleAuthError)
    },
  }),
  branch(
    ({ currentUser }) => R.isNil(currentUser),
    renderNothing,
  ),
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
