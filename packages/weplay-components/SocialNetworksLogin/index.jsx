import React, { useEffect } from 'react'
import * as PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import withSocialLoginHandlers from 'weplay-core/HOCs/withSocialLoginHandlers'
import { useOAuth2Listener } from 'weplay-core/hooks/auth/useOAuth2Listener'

import SocialNetworksLoginList from 'weplay-components/SocialNetworksLoginList/SocialNetworksLoginList'

const SocialNetworksLogin = ({
  logAuthEvent,
  getSocialLoginSuccessHandler,
  getSocialErrorHandler,
  requestParams,
}) => {
  const oAuth2Listener = useOAuth2Listener(getSocialLoginSuccessHandler, getSocialErrorHandler, requestParams)
  const globalScope = useSelector(globalScopeSelector)
  useEffect(() => {
    globalScope.addEventListener('message', oAuth2Listener)
    return () => {
      globalScope.removeEventListener('message', oAuth2Listener)
    }
  }, [])
  return (
    <SocialNetworksLoginList
      logAuthEvent={logAuthEvent}
      requestParams={requestParams}
    />
  )
}

SocialNetworksLogin.propTypes = {
  logAuthEvent: PropTypes.func.isRequired,
  getSocialLoginSuccessHandler: PropTypes.func.isRequired,
  getSocialErrorHandler: PropTypes.func.isRequired,
  requestParams: PropTypes.shape({}),
}

SocialNetworksLogin.defaultProps = {
  requestParams: {},
}

export default React.memo(withSocialLoginHandlers({
  socialErrorKey: 'socialNetworkUsedButNotLinked',
})(SocialNetworksLogin))
