import * as R from 'ramda'
import {
  compose,
  withHandlers,
  withStateHandlers,
  lifecycle,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  i18nTextsSelector,
  currentLanguageSelector,
} from 'weplay-core/reduxs/language/reducer'
import { triggerForgotPassModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import {
  createUserSubscription,
  deleteUserSubscription,
} from 'weplay-core/reduxs/subscriptions/actions'
import { userEmailSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import {
  userTokenSelector,
  createSubscriptionNameByIdSelector,
} from 'weplay-core/reduxs/subscriptions/reducer'

const mapPropsToId = R.prop('subscriptionScopeId')

const container = compose(
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    currentLanguage: currentLanguageSelector,
    userEmail: userEmailSelector,
    userToken: userTokenSelector,
    subscriptionNameById: createSubscriptionNameByIdSelector(mapPropsToId),
  }), {
    // actionCreators
    triggerForgotPassModal,
    createSubscription: createUserSubscription.request,
    deleteSubscription: deleteUserSubscription.request,
  }),

  withStateHandlers(() => ({
    isChecked: false,
  }), {
    toggleCheckBox: ({ isChecked }) => () => ({
      isChecked: !isChecked,
    }),
    setCheckBox: () => bool => ({
      isChecked: bool,
    }),
  }),

  withHandlers({
    saveChanges: ({
      createSubscription,
      deleteSubscription,
      userEmail,
      currentLanguage,
      subscriptionNameById,
      toggleSetTournamentNotificationModal,
      isChecked,
      userToken,
      isSubscribed,
    }) => () => {
      if (isChecked === isSubscribed) {
        toggleSetTournamentNotificationModal()
        return
      }

      const requestBody = {
        email: userEmail,
        language: currentLanguage,
        scope: subscriptionNameById,
        token: userToken,
      }
      const requestFunc = isChecked ? createSubscription : deleteSubscription
      requestFunc(requestBody).then(toggleSetTournamentNotificationModal)
    },
  }),

  lifecycle({
    componentDidUpdate(prevProps) {
      const { isSubscribed, setCheckBox } = this.props

      if (prevProps.isSubscribed !== this.props.isSubscribed) {
        setCheckBox(isSubscribed)
      }
    },
  }),
)

export default container
