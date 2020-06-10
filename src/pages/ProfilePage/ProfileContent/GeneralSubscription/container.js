import {
  compose,
  lifecycle,
  withStateHandlers,
  withHandlers,
  withProps,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  i18nTextsSelector,
  currentLanguageSelector,
} from 'weplay-core/reduxs/language/reducer'
import {
  getUserSubscriptions,
  createUserSubscription,
  deleteUserSubscription,
} from 'weplay-core/reduxs/subscriptions/actions'
import {
  currentUserSelector,
  userEmailSelector,
} from 'weplay-core/reduxs/_legacy/auth/reducer'
import {
  userTokenSelector,
  isUserSubscribedToScopeSelector,
  isCreateDeleteSubscriptionLoadingSelector,
} from 'weplay-core/reduxs/subscriptions/reducer'

const DEFAULT_SCOPE = '5b767470b087110022532762'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    currentUser: currentUserSelector,
    userEmail: userEmailSelector,
    currentLanguage: currentLanguageSelector,
    isUserSubscribed: isUserSubscribedToScopeSelector(DEFAULT_SCOPE),
    isSubscriptionLoading: isCreateDeleteSubscriptionLoadingSelector,
    userToken: userTokenSelector,
  }), {
    // actionCreators
    getUserSubscriptions: getUserSubscriptions.request,
    createSubscription: createUserSubscription.request,
    deleteSubscription: deleteUserSubscription.request,
  }),

  withStateHandlers({
    isChecked: false,
  }, {
    toggleCheckBox: ({ isChecked }) => () => ({
      isChecked: !isChecked,
    }),
  }),
  withProps({
    defaultScopeName: 'Digest',
    linkUrl: '/cabinet/managing-subscriptions',
  }),
  withHandlers({
    toggleSubscription: props => () => {
      if (props.isUserSubscribed) {
        props.deleteSubscription({
          email: props.userEmail,
          language: props.currentLanguage,
          scope: props.defaultScopeName,
          token: props.userToken,
        })
      }
      if (!props.isUserSubscribed) {
        props.createSubscription({
          email: props.currentUser.email,
          language: props.currentLanguage,
          scope: props.defaultScopeName,
        }).then(() => {
          props.toggleCheckBox()
        })
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.getUserSubscriptions({
        userEmail: this.props.userEmail,
        params: {
          language: this.props.currentLanguage,
        },
      })
    },
  }),
)

export default container
