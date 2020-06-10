import * as R from 'ramda'
import withLocale from 'weplay-singleton/LocaleProvider/withLocale'
import * as Yup from 'yup'
import { withFormik } from 'formik'
import {
  compose,
  withPropsOnChange,
} from 'recompose'
import withRouter from 'weplay-singleton/RouterProvider/withRouter'

const withEmailForm = compose(
  withRouter,
  withLocale,
  withPropsOnChange([
    't',
  ], ({
    t,
  }) => ({
    schema: Yup.object().shape({
      email: Yup.string()
        .trim()
        .email(t('registration.invalidEmail'))
        .required(t('clientErrors.required')),
    }),
  })),
  withFormik({
    displayName: 'EmailInputForm',
    mapPropsToValues: () => ({
      email: '',
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
      props.generateEmailCode({
        email: values.email,
      })
    },
  }),
)

export default withEmailForm
