import * as Yup from 'yup'
import { withFormik } from 'formik'
import * as R from 'ramda'
import {
  compose,
  withProps,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import {
  generateForgotPasswordCode,
  generateRegistrationCode,
} from 'weplay-core/reduxs/_legacy/auth/actions'
import withAuthService from 'weplay-core/HOCs/withAuthService'

const maxPassLength = 100
const container = compose(
  connect(createStructuredSelector({
    // selectors
    isMobileWidth: isMobileWidthSelector,
    currentUser: currentUserSelector,
  }), {
    // actionCreators
    generateForgotPasswordCode,
    generateRegistrationCode,
  }),
  withLocale,
  withAuthService,
  withProps(({ t }) => ({
    schema: Yup.object().shape({
      email: Yup.string()
        .trim()
        .email(t('registration.invalidEmail'))
        .required(t('clientErrors.required')),
      password: Yup.string()
        .trim()
        .max(maxPassLength, t('clientErrors.tooLong', { max: maxPassLength }))
        .required(t('clientErrors.required')),
    }),
  })),

  withFormik({
    displayName: 'EmailPasswordForm',
    mapPropsToValues: props => ({
      email: props.userEmail || '',
      password: '',
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
      props.onSubmit({
        password: values.password,
        email: values.email,
      })
    },
  }),

  withPropsOnChange([
    'values',
    'errors',
  ], ({
    values,
    errors,
  }) => ({
    isButtonEnabled: R.isEmpty(errors) && !R.isNil(values.password) && !R.isNil(values.email),
  })),
)

export default container
