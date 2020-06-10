import {
  branch,
  compose,
  renderNothing,
  withHandlers,
  withPropsOnChange,
  withState,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { getUser } from 'weplay-core/reduxs/_legacy/auth/actions'
import { getUserWallet } from 'weplay-core/reduxs/wallets/actions'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import { openLoginModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { applyPremium } from 'weplay-core/reduxs/premiums/actions'
import { premiumsSelector } from 'weplay-core/reduxs/premiums/reducer'
import { sortedPremiumsSelector } from 'weplay-core/reduxs/premiums/selectors'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import { ECOMMERCE_EVENT } from 'weplay-core/services/webAnalytics'
import { createEcommerceParams } from 'weplay-core/helpers/createCustomAnalEvents'

import { membersActions } from 'weplay-competitive/reduxs/members'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'
import { PAYMENT_TYPES } from 'weplay-competitive/constants/paymentTypes'
import { AT__PREMIUM_PAY, AT__PREMIUM_SUCCESS, AT__PREMIUM_GO } from 'weplay-competitive/analytics/amplitude'
import withStripe from 'weplay-competitive/HOCs/withStripe'

const container = compose(
  withAnalytics,
  withLocale,
  withStripe,
  connect(createStructuredSelector({
    // selectors
    premiums: premiumsSelector,
    currentUser: currentUserSelector,
    currentMember: currentMemberSelector,
    sortedPremiums: sortedPremiumsSelector,
    globalScope: globalScopeSelector,
  }), {
    // actionCreators
    applyPremium: applyPremium.request,
    getUserWallet: getUserWallet.request,
    getUser,
    openLoginModal,
    createMember: membersActions.createRecord.request,
  }),

  branch(
    ({ premiums }) => !premiums,
    renderNothing,
  ),
  withPropsOnChange([
    't',
  ], ({
    t,
  }) => ({
    tabs: [
      {
        id: 'creditCard',
        title: t('competitive.premium.modal.tab.credit.title'),
      },
      {
        id: 'usdBalance',
        title: t('competitive.premium.modal.tab.money.title'),
      },
    ],
  })),

  withState('isPremiumModalShown', 'setPremiumModalShown', false),
  withState('activePremiumCard', 'setActivePremiumCard', null),
  withState('token', 'setToken', ''),
  withState('isConfirmModalShown', 'setIsConfirmModalShown', false),
  withHandlers({
    openPremiumModal: ({ setActivePremiumCard }) => (card) => {
      setActivePremiumCard(card)
    },
    closePremiumModal: ({
      setActivePremiumCard,
      setPremiumModalShown,
    }) => () => {
      setActivePremiumCard(null)
      setPremiumModalShown(false)
    },
    hideConfirmBuyPremiumModal: ({ setIsConfirmModalShown }) => () => {
      setIsConfirmModalShown(false)
    },
    updateUserInfo: ({
      /* eslint-disable no-shadow */
      getUser,
      getUserWallet,
      /* eslint-enable no-shadow */
    }) => () => {
      getUser()
      getUserWallet()
    },
  }),

  withHandlers({
    sendEcommerceEvent: ({
      pushAnalEvent,
      activePremiumCard,
    }) => (property, action) => pushAnalEvent(ECOMMERCE_EVENT, createEcommerceParams({
      ecommerce: {
        currencyCode: 'USD',
        [property]: {
          products: [{
            name: `${activePremiumCard.period} month`,
            id: activePremiumCard.subscriptionId,
            price: activePremiumCard.usdPrice,
            position: activePremiumCard.position,
          }],
        },
      },
      action,
    })),
  }),
  withHandlers({
    handleApplyPremium: ({
      /* eslint-disable no-shadow */
      applyPremium,
      activePremiumCard,
      hideConfirmBuyPremiumModal,
      updateUserInfo,
      logAmplitude,
      sendEcommerceEvent,
      /* eslint-enable no-shadow */
    }) => () => {
      logAmplitude(AT__PREMIUM_PAY)
      sendEcommerceEvent('click', 'Product Buy')
      applyPremium({
        params: {
          subscription_id: activePremiumCard.subscriptionId,
          type: PAYMENT_TYPES.WP_BALANCE,
        },
      })
        .then(() => {
          hideConfirmBuyPremiumModal()
          updateUserInfo()
          logAmplitude(AT__PREMIUM_SUCCESS)
          sendEcommerceEvent('purchase', 'Purchase')
        })
    },
    handleGoPremiumBtn: ({
      /* eslint-disable no-shadow */
      isWpCurrency,
      setIsConfirmModalShown,
      openPremiumModal,
      setActivePremiumCard,
      currentUser,
      currentMember,
      openLoginModal,
      createMember,
      setPremiumModalShown,
      logAmplitude,
      /* eslint-enable no-shadow */
    }) => (card) => {
      logAmplitude(AT__PREMIUM_GO, {
        Plan: `${card.period} month`,
      })
      if (!currentUser) {
        openLoginModal()
        return
      }
      if (!currentMember.isFetched) {
        createMember()
      }
      if (isWpCurrency) {
        setActivePremiumCard(card)
        setIsConfirmModalShown(true)
      } else {
        openPremiumModal(card)
        setPremiumModalShown(true)
      }
    },
  }),
)

export default container
