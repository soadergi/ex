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
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withFormik } from 'formik'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { isValidEmail } from 'weplay-core/helpers/isValidEmail'
import { startCase } from 'weplay-core/helpers/cases'
import {
  createSubscriptionErrorTextSelector,
  isSubscriptionRequestSentSelector,
  isCreateUserSubscriptionLoadingSelector,
} from 'weplay-core/reduxs/subscriptions/reducer'
import { createUserSubscription } from 'weplay-core/reduxs/subscriptions/actions'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'

import { formNames } from '../consts'

const DAY_TO_MILLISECONDS = 86400000
let gsapPromise
const container = compose(
  defaultProps({
    subscriptionSource: 'subscribeForms',
  }),

  connect(createStructuredSelector({
    // selectors
    emailSubscriptionErrorText: createSubscriptionErrorTextSelector(R.prop('subscriptionSource')),
    isSubscriptionRequestSent: isSubscriptionRequestSentSelector,
    isCreateUserSubscriptionLoading: isCreateUserSubscriptionLoadingSelector,
  }), {
    // actionCreators
    createSubscription: createUserSubscription.request,
    clearUserSubscription: createUserSubscription.clear,
  }),
  withAnalytics,
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
    backgroundImage: subscriptionBlock.localizations[locale].bgImage,
    textColor: subscriptionBlock.localizations[locale].textColor,
  })),

  withStateHandlers({
    isUserSubscribed: false,
  }, {
    setUserSubscribeStatus: () => isUserSubscribed => ({ isUserSubscribed }),
  }),

  withHandlers(() => {
    let submitForm
    return {
      subscribeFormRef: () => (ref) => { submitForm = ref },
      animate: () => () => {
        if (gsapPromise) {
          gsapPromise.then(module => module.default(submitForm))
        }
      },
    }
  }),

  withFormik({
    mapPropsToValues: () => ({
      [formNames.email]: '',
      [formNames.checkbox]: false,
    }),

    validate: (values, { t }) => {
      const errors = {}
      if (!isValidEmail(values[formNames.email])) {
        errors[formNames.email] = t('registration.invalidSubscribeEmail')
      }
      if (!values[formNames.checkbox]) {
        errors[formNames.checkbox] = true
      }
      return errors
    },

    handleSubmit: (values, {
      props: {
        /* eslint-disable no-shadow */
        locale,
        scope,
        logAnalytics,
        routeInfo,
        createSubscription,
        isCreateUserSubscriptionLoading,
        isSubscriptionRequestSent,
        /* eslint-enable no-shadow */
      },
    }) => {
      if (isCreateUserSubscriptionLoading || isSubscriptionRequestSent) return
      gsapPromise = import('./animateForm')
      logAnalytics({
        eventCategory: 'Interactions',
        eventAction: 'subscribe',
        eventLabel: scope,
        eventContext: `${startCase(routeInfo.name)}Page`,
      })
      createSubscription({
        email: values[formNames.email],
        language: locale,
        scope,
      })
    },

    displayName: 'CustomSubscribeForm',
  }),

  withPropsOnChange([
    'errors',
    'touched',
    'modifiers',
    'textColor',
  ], ({
    errors,
    touched,
    modifiers,
    textColor,
  }) => ({
    isEmailError: !R.isNil(errors[formNames.email]) && Boolean(touched[formNames.email]),
    checkboxModifiers: (modifiers.includes('lightTheme') || textColor === 'black')
      ? ['subscribeForm', 'colorBlack']
      : ['subscribeForm'],
  })),

  lifecycle({
    componentDidMount() {
      const subscriptionScopes = cookies.get('subscribedScopes') ?? '[]'
      const isUserSubscribed = JSON.parse(subscriptionScopes).includes(this.props.scope)

      if (isUserSubscribed) this.props.onSubscribe()
      this.props.setUserSubscribeStatus(isUserSubscribed)
    },
    componentDidUpdate(prevProps) {
      const {
        emailSubscriptionErrorText,
        setFieldError,
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
          expires: new Date(new Date().getTime() + DAY_TO_MILLISECONDS),
        })
        animate()
      }
      if (!prevProps.emailSubscriptionErrorText && emailSubscriptionErrorText) {
        setFieldError(formNames.email, emailSubscriptionErrorText)
      }
    },
    componentWillUnmount() {
      this.props.clearUserSubscription()
    },
  }),

  branch(
    ({ isUserSubscribed }) => isUserSubscribed,
    renderNothing,
  ),
)

export default container
