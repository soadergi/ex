import * as R from 'ramda'
import {
  compose, lifecycle, withHandlers, withPropsOnChange, withStateHandlers,
} from 'recompose'
import i18n from 'i18n-react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { O_AUTH2_SUCCESS } from 'weplay-core/consts/oAuth2MessageTypes'
import withSocialLoginHandlers from 'weplay-core/HOCs/withSocialLoginHandlers'
import { startCase } from 'weplay-core/helpers/cases'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import { userSocialInfoSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { disableUserSocial, oauth2Link } from 'weplay-core/reduxs/_legacy/auth/actions'
import toaster, { TOAST_TYPE } from 'weplay-core/services/toastNotifications'

import { getSocialConfigs } from 'weplay-components/SocialNetworksLogin/consts'

const lastSocialCode = 300
const container = compose(
  connect(createStructuredSelector({
    userSocialInfo: userSocialInfoSelector,
    globalScope: globalScopeSelector,
  }), {
    disableUserSocial,
    oauth2Link,
  }),
  withSocialLoginHandlers({
    socialErrorKey: 'socialNetworkLinkedToAnotherAccount',
  }),
  withStateHandlers({
    isLastSocialNotificationModalVisible: false,
  }, {
    toggleLastSocialNotificationModal: ({ isLastSocialNotificationModalVisible }) => () => ({
      isLastSocialNotificationModalVisible: !isLastSocialNotificationModalVisible,
    }),
  }),
  withHandlers({
    disableUserSocial: props => (socialName) => {
      props.disableUserSocial({
        social_type: socialName.toUpperCase(),
      })
        .then(() => {
          toaster.showNotification({
            type: TOAST_TYPE.SUCCESS,
            content: i18n.translate(
              'mediaCore.notifications.success.socialUnlinked',
              { socialName: startCase(socialName) },
            ),
          })
        })
        .catch((response) => {
          const responseCode = R.path(['response', 'status'], response)
          if (responseCode === lastSocialCode) {
            props.toggleLastSocialNotificationModal()
          }
        })
    },
    checkIsActive: props => item => !!R.find(R.propEq('type', item.source.toUpperCase()))(props.userSocialInfo),
  }),
  withPropsOnChange([
    'globalScope',
  ], ({
    globalScope,
  }) => {
    const origin = globalScope.location.origin
    return {
      socialAuthSettings: getSocialConfigs(origin),
    }
  }),
  // TODO: extract to HOC? code duplication with oAtuh2Login
  withHandlers({
    /* eslint-disable no-shadow */
    oAuth2Listener: props => (event) => {
      let message = {}
      try {
        message = JSON.parse(event.data)
      } catch (err) {
        // we need to handle only our events here
      }
      switch (message.type) {
        case O_AUTH2_SUCCESS:
          props.oauth2Link({
            source: message.data.source,
            code: message.data.code,
            redirect_uri: message.data.redirect_uri,
          })
            .then(() => {
              toaster.showNotification({
                type: TOAST_TYPE.SUCCESS,
                content: i18n.translate(
                  'mediaCore.notifications.success.socialLinked',
                  { socialName: startCase(message.data.source) },
                ),
              })
            })
            .catch(props.getSocialErrorHandler(startCase(message.data.source)))
          break
        default:
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.globalScope.addEventListener('message', this.props.oAuth2Listener)
    },
    componentWillUnmount() {
      this.props.globalScope.removeEventListener('message', this.props.oAuth2Listener)
    },
  }),
)

export default container
