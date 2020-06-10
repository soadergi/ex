import * as R from 'ramda'
import {
  compose,
  withHandlers,
  withProps,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import {
  currentLanguagePrefixSelector, i18nTextsSelector,
  currentLanguageSelector,
} from 'weplay-core/reduxs/language/reducer'
import { openLoginModal, triggerPromoCodesModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import withScrollAnalytics from 'weplay-core/HOCs/withScrollAnalytics'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { getPromoCodesCount } from 'weplay-core/reduxs/promoCodes/actions'
import { promoCodesCountSelector } from 'weplay-core/reduxs/promoCodes/reducer'

import ogImage from './img/forge-of-masters/Codes_sharepic.jpg'
import { eventsRulesAndAgreementsURLs } from './constants'
// eslint-disable-next-line max-len
const backgroundImage = 'https://cdn-prod.weplay.tv/br/img/node_modules/weplay-events/pages/ForgeOfMastersLeaguePage/img/bg.87b6ed.jpg'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    promocodesCount: promoCodesCountSelector,
    currentLanguagePrefix: currentLanguagePrefixSelector,
    currentUser: currentUserSelector,
    currentLanguage: currentLanguageSelector,
  }), {
    // actionCreators
    triggerPromoCodesModal,
    getPromoCodesCount: getPromoCodesCount.request,
    openLoginModal,
  }),

  withPageViewAnalytics(),

  withPropsOnChange([
    'i18nTexts',
  ], ({
    i18nTexts,
  }) => ({
    seoInfo: R.pathOr({}, ['promocodes', 'forgeOfMasters', 'seo', 'default'], i18nTexts),
  })),

  withScrollAnalytics,
  withAnalytics,

  withHandlers(({
    logAnalytics,
    startcasePageName,
  }) => {
    const analyticClickHandler = eventAction => logAnalytics({
      eventCategory: `${startcasePageName} landing click`,
      eventAction,
    })
    return {
      rulesClickHandler: () => () => analyticClickHandler('Rules'),
      allRulesClickHandler: () => () => analyticClickHandler('All rules'),
      agreementClickHandler: () => () => analyticClickHandler('User Agreement'),
      ctaClickHandler: () => () => analyticClickHandler('Go for codes (CTA)'),
    }
  }),

  withProps(({
    currentLanguagePrefix,
  }) => ({
    ogImage,
    // TODO: refactor component and separate EventType from component
    eventType: 'forgeOfMasters',
    backgroundImageStyle: { backgroundImage: `url(${backgroundImage})` },
    // TODO: refactor component and separate EventType from component

    events: {
      forgeOfMasters: {
        leftImage: '',
        rulesUrls: `${currentLanguagePrefix}${eventsRulesAndAgreementsURLs.forgeOfMasters.rulesUrls}`,
        userAgreementUrls: `${currentLanguagePrefix}${eventsRulesAndAgreementsURLs.forgeOfMasters.userAgreementUrls}`,
      },
    },
    ctaUrls: {
      strength: '/events/artifact/mighty-triad-strength-1',
      agility: '/events/artifact/mighty-triad-agility-2',
      intelligence: '/events/artifact/mighty-triad-intelligence-3',
      winterMadness: '/events/dota-2/winter-madness',
      lockAndLoad: '/events/cs-go/lock-and-load',
      forgeOfMasters: '/events/cs-go/forge-of-masters',
    },
  })),
)

export default container
