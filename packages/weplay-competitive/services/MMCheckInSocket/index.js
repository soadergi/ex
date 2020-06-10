import webSocket, { WS_TOPICS } from 'weplay-singleton/socket'

const getMMCheckInTopic = MMMatchId => `${WS_TOPICS.MM_CHECK_IN}${MMMatchId}`

export const EVENTS = {
  MM_CHECK_IN: 'MatchmakingCheckIn',
}

const MM_SERVICE_INPUT_TOPIC = '/wss/input/matchmaking-checkin'

class MMCheckInSocket {
  listenerIndex = null

  setListenerIndex = (newListenerIndex) => {
    this.listenerIndex = newListenerIndex
  }

  getListenerIndex = () => this.listenerIndex

  subscribe = (MMMatchId, onSocketMessage) => {
    const MMTopic = getMMCheckInTopic(MMMatchId)
    return webSocket.subscribeToTopic(MMTopic, onSocketMessage).then(
      index => this.setListenerIndex(index),
    )
  }

  unsubscribe = (MMMatchId) => {
    const MMTopic = getMMCheckInTopic(MMMatchId)
    return webSocket.unsubscribeFromTopic(MMTopic, this.getListenerIndex())
  }

  sendUserCheckInEvent = ({
    userId,
    MMMatchId,
    checkIn,
  }) => {
    const checkInEvent = {
      meta: {
        type: EVENTS.MM_CHECK_IN,
      },
      data: {
        match_id: MMMatchId,
        check_in: checkIn,
      },
    }
    return webSocket.send(userId, MM_SERVICE_INPUT_TOPIC, checkInEvent)
  }
}

export default new MMCheckInSocket()
