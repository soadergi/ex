import withSocialLoginHandlers from 'weplay-core/HOCs/withSocialLoginHandlers'
import i18n from 'i18n-react'
import {
  compose,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { googleLink } from 'weplay-core/reduxs/_legacy/auth/actions'
import toaster, { TOAST_TYPE } from 'weplay-core/services/toastNotifications'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
    googleLink,
  }),
  withSocialLoginHandlers({
    socialErrorKey: 'socialNetworkLinkedToAnotherAccount',
  }),
  withHandlers({
    handleSuccess: props => ({ accessToken }) => {
      props.googleLink({
        accessToken,
      })
        .then(() => {
          toaster.showNotification({
            type: TOAST_TYPE.SUCCESS,
            content: i18n.translate(
              'mediaCore.notifications.success.socialLinked',
              { socialName: 'Google' },
            ),
          })
        })
        .catch(props.getSocialErrorHandler('Google'))
    },
  }),
)

export default container
