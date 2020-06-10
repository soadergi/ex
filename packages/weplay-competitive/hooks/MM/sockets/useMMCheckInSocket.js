import {
  useCallback,
  useEffect,
} from 'react'

import { dispatchPartialModelAction } from 'weplay-core/reduxs/_factories/utils'
import useAction from 'weplay-core/helpers/useAction'

import MMCheckInSocket, { EVENTS } from 'weplay-competitive/services/MMCheckInSocket'
import useMMActiveMatch from 'weplay-competitive/hooks/MM/useMMActiveMatch'

const useMMCheckInSocket = () => {
  const { activeMMMatch } = useMMActiveMatch()
  const { dispatchPartialModel } = useAction({
    dispatchPartialModel: dispatchPartialModelAction,
  })

  const onSocketMessage = useCallback((message) => {
    switch (message.meta.type) {
      case EVENTS.MM_CHECK_IN:
        dispatchPartialModel({
          partialModel: {
            ...message.data,
            type: 'match',
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
  }, [dispatchPartialModel])

  useEffect(() => {
    MMCheckInSocket.subscribe(activeMMMatch.id, onSocketMessage)
    return () => MMCheckInSocket.unsubscribe(activeMMMatch.id)
  }, [activeMMMatch.id, onSocketMessage])
}

export default useMMCheckInSocket
