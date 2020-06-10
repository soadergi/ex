import queryString from 'query-string'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import useAction from 'weplay-core/helpers/useAction'
import { oauth2Link } from 'weplay-core/reduxs/_legacy/auth/actions'
import { O_AUTH2_SUCCESS } from 'weplay-core/consts/oAuth2MessageTypes'
import toaster, { TOAST_TYPE } from 'weplay-core/services/toastNotifications'
import { startCase } from 'weplay-core/helpers/cases'

export const useOauth2Handler = (config) => {
  const t = useTranslation()
  const globalScope = useSelector(globalScopeSelector)
  const { oauth2LinkAction } = useAction({ oauth2LinkAction: oauth2Link })
  const oAuth2Listener = useCallback((event) => {
    let message = {}
    try {
      message = JSON.parse(event.data)
    } catch (err) {
      // we need to handle only our events here
    }
    if (message.type === O_AUTH2_SUCCESS) {
      oauth2LinkAction({
        source: message.data.source,
        code: message.data.code,
        redirect_uri: message.data.redirect_uri,
      })
        .then(() => {
          toaster.showNotification({
            type: TOAST_TYPE.SUCCESS,
            content: t(
              'mediaCore.notifications.success.socialLinked',
              { socialName: startCase(message.data.source) },
            ),
          })
        })
        .catch(() => toaster.showNotification({
          type: TOAST_TYPE.ERROR,
          content: t(
            'serverErrors.socialNetworkLinkedToAnotherAccount',
            { socialName: startCase(message.data.source) },
          ),
        }))
    }
  }, [oauth2LinkAction])
  useEffect(() => {
    globalScope.addEventListener('message', oAuth2Listener)

    return () => {
      globalScope.removeEventListener('message', oAuth2Listener)
    }
  }, [])

  return useCallback(() => {
    const queryURL = queryString.stringify(config.queryParams)
    globalScope.open(
      `${config.authLink}?${queryURL}`,
      'AuthPopup',
      'resizable,scrollbars,status',
    )
  }, [config, globalScope])
}
