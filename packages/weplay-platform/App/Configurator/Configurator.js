import { useEffect, useState } from 'react'
import * as PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import useAction from 'weplay-core/helpers/useAction'
import { userIdSelector, userRegistrationDateSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import webAnalytics from 'weplay-core/services/webAnalytics'
import { apiHostSelector } from 'weplay-core/reduxs/common/selectors'
import { axios, configureApiHost } from 'weplay-core/services/axios'
import { signOut } from 'weplay-core/reduxs/_legacy/auth/actions'
import toaster from 'weplay-core/services/toastNotifications'

// TODO: rewrite Configurator with HOOKS and move to root
const Configurator = ({
  children,
}) => {
  const apiHost = useSelector(apiHostSelector)

  const userId = useSelector(userIdSelector)
  const userRegistrationDate = useSelector(userRegistrationDateSelector)

  const { dispatchSignOut } = useAction({
    dispatchSignOut: signOut,
  })
  const { locale } = useLocale()
  const [isAlreadyDispatchSignOut, setIsAlreadyDispatchSignOut] = useState(false)

  const serviceSubstring = 'service/'

  const sendAnalytics = (response, extraFields) => {
    let requestFields = {}
    if (response) {
      const requestUrl = response.config.url
      const requestMethod = response.config.method
      const requestService = requestUrl.match(/[a-zA-Z_-]*(?=-service)/)?.[0]
      const endpointSubstring = requestService
        ? requestUrl.slice(requestUrl.indexOf(serviceSubstring) + serviceSubstring.length)
        : requestUrl
      const [requestEndpoint, requestParams] = endpointSubstring.split('?')
      const responseCode = response.status
      const responseData = response.data?.data
      requestFields = {
        requestUrl,
        requestService,
        requestEndpoint,
        requestParams,
        requestMethod,
        responseCode,
        responseData,
      }
    }
    webAnalytics.sendResponseEvent({
      ...requestFields,
      ...extraFields,
    })
  }

  const handleRequestSuccess = (response) => {
    sendAnalytics(response, { requestStatus: 'successful' })
  }

  const handleRequestError = (response) => {
    const errorCode = response.data?.error?.code
    toaster.showServerError(errorCode)
    sendAnalytics(response, {
      requestStatus: 'unsuccessful',
      errorMessage: response.data?.error?.message,
      errorCode,
    })
  }

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        handleRequestSuccess(response)
        if (response.headers?.['x-just-unauthorized']) {
          if (!isAlreadyDispatchSignOut) {
            dispatchSignOut()
            setIsAlreadyDispatchSignOut(true)
          }
        } else {
          setIsAlreadyDispatchSignOut(false)
        }
        return response
      }, (error) => {
        handleRequestError(error?.response)
        return Promise.reject(error)
      },
    )
  }, [])

  useEffect(() => {
    // TODO: @illia think how to avoid hack with faster initialization
    configureApiHost(apiHost)
  }, [apiHost, locale])

  useEffect(() => {
    webAnalytics.addParams({
      userId,
      userRegistrationDate,
    })
  }, [userId, userRegistrationDate])

  return children
}

Configurator.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Configurator
