import * as R from 'ramda'

import transliterate from 'weplay-core/helpers/translit'
import { INVITE_NOTIFICATION_TYPE } from 'weplay-core/reduxs/_legacy/lobbyNotifications/consts'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import toaster, { TOAST_TYPE } from 'weplay-core/services/toastNotifications'

import { DISCIPLINES } from 'weplay-competitive/config/disciplines'

const MATCH_NOTIFICATION_TIMEOUT_MINUTES = 7
const MATCH_NOTIFICATION_TIMEOUT = MATCH_NOTIFICATION_TIMEOUT_MINUTES * 60 * 1000
export const handlePrivateMessage = ({
  queryMatches,
  toggleNotification, // eslint-disable-line no-shadow
  playMatchAlertSound,
  dispatchPartialModelAction,
  t,
}) => (message) => {
  switch (message.meta.type) {
    case 'MatchStatusEvent':
      dispatchPartialModelAction({
        partialModel: {
          type: 'match',
          ...message.data,
        },
        service: 'matchmaking-service',
      })
      break
    case 'MatchmakingCheckIn':
      dispatchPartialModelAction({
        partialModel: {
          type: 'match',
          ...message.data,
        },
        service: 'matchmaking-service',
      })
      playMatchAlertSound()
      break
    case 'PENALTY_EVENT':
      dispatchPartialModelAction({
        partialModel: message.data,
        service: 'penalty-service',
      })
      if (message.data?.penaltyName === 'MATCHMAKING_CHECKIN_PENALTY') {
        if (message.data.active) {
          toaster.showNotification({
            type: TOAST_TYPE.WARNING,
            content: t('competitive.notifications.warning.penaltyMM'),
            dateTime: Date.now(),
          })
        } else {
          toaster.showNotification({
            type: TOAST_TYPE.SUCCESS,
            content: t('competitive.notifications.success.penaltyTimeFinished'),
            dateTime: Date.now(),
          })
        }
      }

      break
    case 'MatchCreatedEvent':
      queryMatches({
        'filter[lobby.id]': message.data.data.id,
        included: 'tournament',
      }).then((matchesResponse) => {
        const matchId = R.path([
          'data',
          '0',
          'id',
        ])(matchesResponse)

        const tournamentId = R.path([
          'data',
          '0',
          'relationships',
          'tournament',
          'data',
          'id',
        ])(matchesResponse)

        const tournamentName = R.path([
          'included',
          'tournament',
          tournamentId,
          'attributes',
          'name',
        ])(matchesResponse)

        const discipline = R.pipe(
          R.values,
          R.find(
            R.propEq(
              'id',
              R.pipe(
                R.prop('data'),
                R.head,
                R.path(['relationships', 'game', 'data', 'id']),
              )(matchesResponse),
            ),
          ),
          R.prop('url'),
        )(DISCIPLINES)
        toggleNotification({
          type: INVITE_NOTIFICATION_TYPE,
          data: {
            matchLink: pathWithParamsByRoute(
              NAMES.MATCH,
              {
                tournamentId,
                tournamentName: transliterate(tournamentName),
                matchId,
                discipline,
              },
            ),
          },
        })

        playMatchAlertSound()

        setTimeout(
          () => toggleNotification(null),
          MATCH_NOTIFICATION_TIMEOUT,
        )
      })
      break
    default:
      console.warn(
        'UNHANDLED MESSAGE FROM TOPIC',
        message,
      )
  }
}
