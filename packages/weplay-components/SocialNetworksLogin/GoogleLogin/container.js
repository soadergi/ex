import {
  compose, withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withSocialLoginHandlers from 'weplay-core/HOCs/withSocialLoginHandlers'
import { googleLogin, updateUser } from 'weplay-core/reduxs/_legacy/auth/actions'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
    googleLogin,
    updateUser,
  }),
  withSocialLoginHandlers({
    socialErrorKey: 'socialNetworkUsedButNotLinked',
  }),
  withHandlers({
    handleSuccess: props => ({ accessToken }) => {
      props.googleLogin({
        accessToken,
      }, {
        params: { ...props.axiosParams },
      })
        .catch(props.getSocialErrorHandler('Google'))
        .then(
          props.getSocialLoginSuccessHandler('Google'),
        )
    },
  }),
)

export default container
