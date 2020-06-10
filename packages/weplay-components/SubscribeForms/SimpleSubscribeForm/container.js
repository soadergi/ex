import * as R from 'ramda'
import cookies from 'js-cookie'
import {
  compose,
  defaultProps,
  withStateHandlers,
  withPropsOnChange,
  withHandlers,
  lifecycle,
  branch,
  renderNothing,
  renderComponent,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withFormik } from 'formik'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { getSubscriptionErrorText } from 'weplay-core/reduxs/subscriptions/helpers'
import { i18nTextsSelector, currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import { isValidEmail } from 'weplay-core/helpers/isValidEmail'
import { createUserSubscription } from 'weplay-core/reduxs/subscriptions/actions'
import { isCreateUserSubscriptionLoadingSelector } from 'weplay-core/reduxs/subscriptions/reducer'

import { formNames } from '../consts'

import animateForm from './animateForm'
import SuccessBlock from './SuccessBlock'

const container = compose(
  branch(
    ({ subscriptionBlock }) => R.isNil(subscriptionBlock),
    renderNothing,
  ),

  defaultProps({
    modifiers: [],
    subscriptionSource: 'subscribeForms',
  }),

  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    currentLanguage: currentLanguageSelector,
    isCreateUserSubscriptionLoading: isCreateUserSubscriptionLoadingSelector,
  }), {
    // actionCreators
    createSubscription: createUserSubscription.request,
    clearUserSubscription: createUserSubscription.clear,
  }),
  withLocale,

  withPropsOnChange([
    'subscriptionBlock',
    'locale',
  ], ({
    subscriptionBlock,
    locale,
  }) => ({
    subscription: subscriptionBlock.localizations[locale],
    scope: subscriptionBlock.name,
  })),

  withStateHandlers({
    isUserSubscribed: false,
    isSubscriptionRequestSent: false,
  }, {
    setUserSubscribeStatus: () => scope => ({
      isUserSubscribed: R.pipe(
        R.defaultTo('[]'),
        JSON.parse,
        R.contains(scope),
      )(cookies.get('subscribedScopes')),
    }),
    setSubscriptionRequestSentStatus: () => () => ({
      isSubscriptionRequestSent: true,
    }),
  }),

  withHandlers(() => {
    let submitForm
    return {
      subscribeFormRef: () => (ref) => { submitForm = ref },
      animate: () => () => submitForm && animateForm(submitForm),
    }
  }),

  withFormik({
    mapPropsToValues: () => ({
      [formNames.email]: '',
      [formNames.checkbox]: false,
    }),

    validate: (values, { i18nTexts }) => {
      const errors = {}
      if (!isValidEmail(values[formNames.email])) {
        errors[formNames.email] = i18nTexts.registration.invalidSubscribeEmail
      }
      if (!values[formNames.checkbox]) {
        errors[formNames.checkbox] = true
      }
      return errors
    },

    handleSubmit: (values, {
      props: {
        /* eslint-disable no-shadow */
        currentLanguage,
        scope,
        createSubscription,
        /* eslint-enable no-shadow */
        setSubscriptionRequestSentStatus,
        i18nTexts,
        subscriptionSource,
        isCreateUserSubscriptionLoading,
        isSubscriptionRequestSent,
      },
      setFieldError,
    }) => {
      if (isCreateUserSubscriptionLoading || isSubscriptionRequestSent) return
      createSubscription({
        email: values[formNames.email],
        language: currentLanguage,
        scope,
      }).then(setSubscriptionRequestSentStatus)
        .catch((error) => {
          const errorText = getSubscriptionErrorText(error, i18nTexts, subscriptionSource)
          setFieldError(formNames.email, errorText)
        })
    },

    displayName: 'CustomSubscribeForm',
  }),

  withPropsOnChange([
    'errors',
    'touched',
    'modifiers',
  ], ({
    errors,
    touched,
  }) => ({
    isEmailError: !R.isNil(errors[formNames.email]) && Boolean(touched[formNames.email]),
    checkboxModifiers: ['subscribeForm', 'colorGrey'],
  })),

  lifecycle({
    componentDidMount() {
      this.props.setUserSubscribeStatus(this.props.scope)
    },
    componentDidUpdate() {
      const {
        animate,
        isSubscriptionRequestSent,
        scope,
      } = this.props
      if (isSubscriptionRequestSent) {
        const scopesFromCookies = R.pipe(
          R.defaultTo('[]'),
          JSON.parse,
        )(cookies.get('subscribedScopes'))

        cookies.set('subscribedScopes', R.uniq(R.append(scope, scopesFromCookies)), {
          expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24)),
        })
        animate()
      }
    },
    componentWillUnmount() {
      this.props.clearUserSubscription()
    },
  }),

  branch(
    ({ isUserSubscribed }) => isUserSubscribed,
    renderComponent(SuccessBlock),
  ),
)

export default container
