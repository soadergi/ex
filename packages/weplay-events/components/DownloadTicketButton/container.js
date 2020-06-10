import {
  useMemo,
  useCallback,
} from 'react'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import useAction from 'weplay-core/helpers/useAction'
import {
  isLoggedInSelector,
  userEmailSelector,
  userIdSelector,
} from 'weplay-core/reduxs/_legacy/auth/reducer'
import { openLoginModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import toaster, { TOAST_TYPE } from 'weplay-core/services/toastNotifications'

import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'
import { getUserTicketIdRequest, downloadTicketByIdRequest } from 'weplay-events/services/e-ticket-service'

export const useDownloadPdfButton = () => {
  const t = useTranslation()
  const { locale } = useLocale()
  const tournamentId = useCurrentTournamentId()
  const isLoggedIn = useSelector(isLoggedInSelector)
  const userEmail = useSelector(userEmailSelector)
  const userId = useSelector(userIdSelector)
  const { openLogin } = useAction({ openLogin: openLoginModal })

  const buttonText = useMemo(
    () => (isLoggedIn
      ? t('events.invitationButton.successButton')
      : t('events.invitationButton.signUp')),
    [isLoggedIn],
  )

  const getTicketId = useCallback(
    () => getUserTicketIdRequest({ userId, tournamentId }),
    [userId, tournamentId],
  )

  const downloadTicket = useCallback(
    (userTicketResponse) => {
      const ticketId = userTicketResponse.data.data._id // eslint-disable-line no-underscore-dangle

      return downloadTicketByIdRequest(ticketId)
    },
    [],
  )

  const handleClick = useCallback(
    () => {
      if (!isLoggedIn) {
        openLogin()
        return
      }

      getTicketId()
        .then(downloadTicket)
        .catch((error) => {
          console.warn(error)
          toaster.showNotification({
            type: TOAST_TYPE.ERROR,
            content: t('events.ticketPage.downloadTicketError'),
          })
        })
    },
    [isLoggedIn, locale, tournamentId],
  )

  // TODO: @Tony implement analytic logic when available
  const isAnalyticsNeeded = true

  return {
    handleClick,
    buttonText,
    isLoggedIn,
    userEmail,
    isAnalyticsNeeded,
  }
}
