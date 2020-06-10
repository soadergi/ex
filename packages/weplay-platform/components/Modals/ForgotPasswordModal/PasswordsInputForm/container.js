import { withFormik } from 'formik'
import * as R from 'ramda'
import {
  compose,
  lifecycle,
  withProps,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as Yup from 'yup'

import { passwordMaxLength } from 'weplay-core/consts/formsRestrictions'
import { userInitialValuesSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import {
  generateForgotPasswordCode,
  resetPassword,
} from 'weplay-core/reduxs/_legacy/auth/actions'
import { triggerForgotPassModal, triggerSignUpModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import { validPassRegExp } from 'weplay-core/helpers/validPassRegExp'
import withAuthService from 'weplay-core/HOCs/withAuthService'

const container = compose(
  withAuthService,
  connect(createStructuredSelector({
    // selectors
    userInitialValues: userInitialValuesSelector,
  }), {
    // actionCreators
    generateForgotPasswordCode,
    triggerForgotPass: triggerForgotPassModal,
    triggerSignUp: triggerSignUpModal,
    resetPassword,
  }),
  withProps(({ t }) => ({
    schema: Yup.object().shape({
      password: Yup.string()
        .trim()
        .max(passwordMaxLength, t('clientErrors.tooLong', { max: passwordMaxLength }))
        .matches(validPassRegExp, { excludeEmptyString: true, message: t('clientErrors.invalidPassword') }),
      confirmPassword: Yup.string()
        .trim()
        .max(passwordMaxLength, t('clientErrors.tooLong', { max: passwordMaxLength }))
        .oneOf([Yup.ref('password')], t('clientErrors.passNotEqual')),
    }),
  })),
  withFormik({
    displayName: 'PasswordsInputForm',
    mapPropsToValues: () => ({
      email: '',
      password: '',
      confirmPassword: '',
    }),
    validate: (values, props) => props.schema.validate(values, { abortEarly: false })
      .then(
        () => Promise.resolve({}),
        R.pipe(
          R.prop('inner'),
          R.map(fieldError => [fieldError.path, fieldError.errors]),
          R.fromPairs,
          errors => Promise.reject(errors),
        ),
      ),
    handleSubmit: (values, { props }) => {
      props.resetPassword({
        body: {
          email: props.userInitialValues.user.email,
          code: props.userInitialValues.user.code,
          password: values.password,
        },
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(props.goToStep)
        .catch(props.handleAuthError)
    },
  }),

  withPropsOnChange([
    'authErrorMessage',
    'errors',
    't',
  ], ({
    authErrorMessage,
    errors,
    t,
  }) => ({
    errors: authErrorMessage ? {
      ...errors,
      password: [t(`serverErrors.${authErrorMessage}`)],
    }
      : errors,
  })),

  withPropsOnChange([
    'dirty',
    'errors',
    'step',
  ], ({
    dirty,
    errors,
    step,
  }) => ({
    isButtonEnabled: R.isEmpty(errors) && dirty,
    isShown: step === 'forgotPassStep1',
  })),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (this.props.values.password !== prevProps.values.password) {
        this.props.resetAuthError()
      }
    },
  }),
)

export default container
