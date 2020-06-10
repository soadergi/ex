import * as R from 'ramda'
import queryString from 'query-string'
import { createStructuredSelector } from 'reselect'
import {
  compose,
  withHandlers,
  withProps,
  withState,
  withPropsOnChange,
  lifecycle,
} from 'recompose'
import { connect } from 'react-redux'

import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import { goTo, NAMES } from 'weplay-core/routes'
import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import { premiumsSelector } from 'weplay-core/reduxs/premiums/reducer'
import { getPremiums } from 'weplay-core/reduxs/premiums/actions'

import { DISCIPLINES } from 'weplay-competitive/config/disciplines'
import { featuresSelectors } from 'weplay-competitive/reduxs/features'
import { AT__PREMIUM_SUCCESS } from 'weplay-competitive/analytics/amplitude'
import { PAYMENT_TYPES } from 'weplay-competitive/constants/paymentTypes'

const ogImageEn = 'https://static-prod.weplay.tv/2020-03-05/35aa7ee1df2507975c446cc3e960f992.3CBBEB-05102D-E8F3F6.jpeg'
const ogImageRu = 'https://static-prod.weplay.tv/2020-03-05/011781cc34580b126b4874394842b8f9.3CBBEB-06122E-EBF5F8.jpeg'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    premiums: premiumsSelector,
    currentLanguage: currentLanguageSelector,
    currentUser: currentUserSelector,
    features: featuresSelectors.allRecordsSelector,
  }), {
    // actionCreators
    getPremiums: getPremiums.request,
  }),

  withPageViewAnalytics(),

  withProps(({
    seoParams: {
      allDisciplineNames: R.pipe(
        R.map(
          R.prop('name'),
        ),
        R.values,
        R.join(', '),
      )(DISCIPLINES),
    },
  })),
  withPropsOnChange([
    'currentLanguage',
  ], ({
    currentLanguage,
  }) => ({
    ogImage: currentLanguage === 'en' ? ogImageEn : ogImageRu,
  })),
  withState('isWPCurrency', 'setWPCurrency', false),
  withHandlers({
    toggleCurrency: ({ setWPCurrency, isWPCurrency }) => () => {
      setWPCurrency(!isWPCurrency)
    },
  }),

  withHandlers({
    sendAnalyticsPremiumSuccess: ({ location, logAmplitude }) => () => {
      const { source } = queryString.parse(location.search)
      // here we can detect payment success source
      // and send any analytics event
      if (source === PAYMENT_TYPES.STRIPE.toLowerCase()) {
        logAmplitude(AT__PREMIUM_SUCCESS)
      }
    },
  }),

  withHandlers({
    redirectPremiumUser: ({
      currentUser,
      history,
      sendAnalyticsPremiumSuccess,
    }) => () => {
      if (currentUser?.['is_premium_account']) {
        sendAnalyticsPremiumSuccess()
        goTo({ name: NAMES.PREMIUM_SUCCESS, history })
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.redirectPremiumUser()
      this.props.getPremiums()
    },
    componentDidUpdate() {
      this.props.redirectPremiumUser()
    },
  }),
)

export default container
