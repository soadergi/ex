import React from 'react'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import classNames from 'classnames'
import { createStructuredSelector } from 'reselect'

import withSocialLoginHandlers from 'weplay-core/HOCs/withSocialLoginHandlers'
import { toggleNotification } from 'weplay-core/reduxs/_legacy/lobbyNotifications/actions'
import { facebookLogin, updateUser } from 'weplay-core/reduxs/_legacy/auth/actions'

import Icon from 'weplay-components/Icon'

import styles from '../styles.scss'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
    facebookLogin,
    updateUser,
    toggleNotification,
  }),
  withSocialLoginHandlers({
    socialErrorKey: 'socialNetworkUsedButNotLinked',
  }),
  withHandlers({
    renderButton: ({ config }) => ({ onClick: enableUserSocial }) => ( // eslint-disable-line
      <a
        className={classNames(
          styles.link,
          styles[config.icon],
        )}
        onClick={enableUserSocial}
      >
        <Icon
          className={styles.icon}
          iconName={config.icon}
          size="small"
        />
      </a>
    ),
    handleCallback: props => ({ accessToken }) => {
      props.facebookLogin({
        accessToken,
      }, {
        params: { ...props.axiosParams },
      })
        .catch(props.getSocialErrorHandler('Facebook'))
        .then(
          props.getSocialLoginSuccessHandler('Facebook'),
        )
    },
  }),
)

export default container
