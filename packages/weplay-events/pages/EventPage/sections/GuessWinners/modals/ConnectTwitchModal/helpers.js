import { useSelector, useDispatch } from 'react-redux'

import { oauth2Login, oauth2Link } from 'weplay-core/reduxs/_legacy/auth/actions'
import { O_AUTH2_SUCCESS } from 'weplay-core/consts/oAuth2MessageTypes'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

export const useTwitchOAuth2Listener = (successHandler, errorHandler) => {
  const isLoggedIn = useSelector(isLoggedInSelector)
  const dispatch = useDispatch()
  const makeOauthRequest = isLoggedIn ? oauth2Link : oauth2Login

  return (event) => {
    let message = {}
    try {
      message = JSON.parse(event.data)
    } catch (err) {
      // we need to handle only our events here
    }
    switch (message.type) {
      case O_AUTH2_SUCCESS:
        dispatch(makeOauthRequest({
          source: message.data.source,
          code: message.data.code,
          redirect_uri: message.data.redirect_uri,
        }, {})).catch(errorHandler('oAuth'))
          .then(successHandler(message.data.source))
        break
      default:
    }
  }
}
