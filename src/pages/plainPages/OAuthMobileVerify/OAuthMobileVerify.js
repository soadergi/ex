import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useLocation } from 'weplay-singleton/RouterProvider/useLocation'
import { useParams } from 'weplay-singleton/RouterProvider/useParams'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

const MOBILE_OAUTH_REDIRECT_BASE = 'weplay://oauth-callback/'

// TODO: @rbogdanov update for all oAuthVerify pages
const OAuthMobileVerify = () => {
  const globalScope = useSelector(globalScopeSelector)

  const { search } = useLocation()
  const { source } = useParams()

  const redirectUrl = `${MOBILE_OAUTH_REDIRECT_BASE}${source}${search}`

  useEffect(() => {
    globalScope.location.replace(redirectUrl)
  }, [globalScope])

  return null
}
export default OAuthMobileVerify
