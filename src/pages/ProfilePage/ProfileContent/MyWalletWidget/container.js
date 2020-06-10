import {
  compose,
  branch,
  renderNothing,
  withPropsOnChange,
  withHandlers,
  withState,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { zendeskLinks } from 'weplay-core/config'
import { triggerMutualModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import { currentLanguageSelector, i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import {
  isUserHasPositiveBalanceSelector,
  wpPointsAmountSelector,
  usdAmountSelector,
} from 'weplay-core/reduxs/wallets/reducer'
import {
  isPremiumSelector,
  isAutoExtendPremiumEnabledSelector,
  expirePremiumAccountDateSelector,
} from 'weplay-core/reduxs/_legacy/auth/reducer'
import withMoment from 'weplay-core/HOCs/withMoment'
import { cancelPremium } from 'weplay-core/reduxs/premiums/actions'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    currentLanguage: currentLanguageSelector,
    isUserHasPositiveBalance: isUserHasPositiveBalanceSelector,
    wpPointsAmount: wpPointsAmountSelector,
    usdAmount: usdAmountSelector,
    isPremiumAccount: isPremiumSelector,
    isAutoExtendPremiumEnabled: isAutoExtendPremiumEnabledSelector,
    expirePremiumAccountDate: expirePremiumAccountDateSelector,
  }), {
    // actionCreators
    triggerMutualModal,
    cancelPremiumRequest: cancelPremium.request,
  }),

  branch(
    ({ isUserHasPositiveBalance, isPremiumAccount }) => !isUserHasPositiveBalance && !isPremiumAccount,
    renderNothing,
  ),
  withMoment,
  withState('isConfirmModalShown', 'setIsConfirmModalShown', false),
  withHandlers({
    openConfirmModal: ({ setIsConfirmModalShown }) => () => {
      setIsConfirmModalShown(true)
    },
    hideConfirmModal: ({ setIsConfirmModalShown }) => () => {
      setIsConfirmModalShown(false)
    },
  }),
  withPropsOnChange([
    'i18nTexts',
    'currentLanguage',
  ], ({
    i18nTexts,
    currentLanguage,
  }) => ({
    links: [
      {
        iconName: 'zendesk',
        text: i18nTexts.cabinet.walletWidget.linkOne,
        url: zendeskLinks.whatIsWp[currentLanguage],
      },
    ],
  })),

  withPropsOnChange([
    'usdAmount',
  ], ({
    usdAmount,
  }) => ({
    isUserHasUsd: Boolean(usdAmount),
  })),
  /* eslint-disable no-shadow */
  withHandlers({
    handleCancelPremium: ({ cancelPremiumRequest, hideConfirmModal }) => () => {
      cancelPremiumRequest()
        .then(hideConfirmModal)
    },
  }),
  /* eslint-enable no-shadow */
)

export default container
