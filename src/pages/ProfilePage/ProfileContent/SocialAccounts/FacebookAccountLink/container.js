import i18n from 'i18n-react'
import React from 'react'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'

import withSocialLoginHandlers from 'weplay-core/HOCs/withSocialLoginHandlers'
import { facebookLink } from 'weplay-core/reduxs/_legacy/auth/actions'
import toaster, { TOAST_TYPE } from 'weplay-core/services/toastNotifications'

import SocialButton from '../SocialAccount/SocialButton'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
    facebookLink,
  }),
  withSocialLoginHandlers({
    socialErrorKey: 'socialNetworkLinkedToAnotherAccount',
  }),
  withHandlers({
    renderButton: ({
      isActive,
      config,
      disableUserSocial,
    }) => ({ onClick: enableUserSocial }) => ( //eslint-disable-line
      <SocialButton
        disableUserSocial={disableUserSocial}
        enableUserSocial={enableUserSocial}
        config={config}
        isActive={isActive}
      />
    ),
    handleCallback: props => ({ accessToken }) => {
      props.facebookLink({
        accessToken,
      })
        .then(() => {
          toaster.showNotification({
            type: TOAST_TYPE.SUCCESS,
            content: i18n.translate(
              'mediaCore.notifications.success.socialLinked',
              { socialName: 'Facebook' },
            ),
          })
        })
        .catch(props.getSocialErrorHandler('Facebook'))
    },
  }),
)

container.propTypes = {
  disableUserSocial: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default container
