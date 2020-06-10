import {
  useCallback,
  useEffect,
} from 'react'

import { dispatchPartialModelAction } from 'weplay-core/reduxs/_factories/utils'
import useAction from 'weplay-core/helpers/useAction'

import MMVotingSocket, { EVENTS } from 'weplay-competitive/services/MMVotingSocket'

export const useMMVotingSockets = ({ matchId }) => {
  const { dispatchMMAction } = useAction({
    dispatchMMAction: dispatchPartialModelAction,
  })

  const onSocketMessage = useCallback((message) => {
    switch (message.meta.type) {
      case EVENTS.VOTING_EVENT:
        dispatchMMAction({
          partialModel: {
            type: 'vote',
            attributes: message.data,
          },
          service: 'matchmaking-voting-service',
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
    MMVotingSocket.subscribe(matchId, onSocketMessage)
    return () => MMVotingSocket.unsubscribe(matchId)
  }, [matchId])
}
