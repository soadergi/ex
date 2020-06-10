import { facebookLogin } from 'weplay-core/reduxs/_legacy/auth/actions'
import useAction from 'weplay-core/helpers/useAction'

export const useFacebookCallback = (successHandler, errorHandler) => {
  const { facebookLoginAction } = useAction({ facebookLoginAction: facebookLogin })
  const handleFacebookCallback = ({ accessToken }) => {
    facebookLoginAction({
      accessToken,
    })
      .catch(errorHandler('Facebook'))
      .then(
        successHandler('Facebook'),
      )
  }
  return handleFacebookCallback
}
