import { useSelector } from 'react-redux'

import { oauth2Login } from 'weplay-core/reduxs/_legacy/auth/actions'
import { O_AUTH2_SUCCESS } from 'weplay-core/consts/oAuth2MessageTypes'
import useAction from 'weplay-core/helpers/useAction'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

export const useOAuth2Listener = (successHandler, errorHandler, axiosParams) => {
  const isLoggedIn = useSelector(isLoggedInSelector)
  const { oAuth2LoginAction } = useAction({ oAuth2LoginAction: oauth2Login })

  return (event) => {
    if (isLoggedIn) {
      return
    }
    let message = {}
    try {
      message = JSON.parse(event.data)
    } catch (err) {
      // we need to handle only our events here
    }
    switch (message.type) {
      case O_AUTH2_SUCCESS:
        oAuth2LoginAction({
          source: message.data.source,
          code: message.data.code,
          redirect_uri: message.data.redirect_uri,
        }, { params: { ...axiosParams } })
          .catch(errorHandler('oAuth'))
          .then(successHandler(message.data.source))
        break
      default:
    }
  }
}
