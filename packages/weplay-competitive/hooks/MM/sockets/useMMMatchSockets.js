import {
  useCallback,
  useEffect,
} from 'react'

import { dispatchPartialModelAction } from 'weplay-core/reduxs/_factories/utils'
import useAction from 'weplay-core/helpers/useAction'

import MMMatchSocket, { EVENTS } from 'weplay-competitive/services/MMMatchSocket'

export const useMMMatchSockets = ({ matchId }) => {
  const { dispatchMMAction } = useAction({
    dispatchMMAction: dispatchPartialModelAction,
  })

  const onSocketMessage = useCallback((message) => {
    switch (message.meta.type) {
      case EVENTS.MATCH_STATUS_EVENT:
      case EVENTS.MATCH_SCORE_EVENT:
        dispatchMMAction({
          partialModel: {
            type: 'match',
            attributes: message.data,
          },
          service: 'matchmaking-service',
        })
        break
      default:
        console.warn(
          'UNHANDLED MESSAGE FROM TOPIC',
          message,
        )
    }
  }, [])

  useEffect(() => {
    MMMatchSocket.subscribe(matchId, onSocketMessage)
    return () => MMMatchSocket.unsubscribe(matchId)
  }, [matchId])
}
