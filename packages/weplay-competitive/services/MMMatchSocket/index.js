import webSocket, { WS_TOPICS } from 'weplay-singleton/socket'

const getMMMatchTopic = matchId => `${WS_TOPICS.MM}${matchId}`

export const EVENTS = {
  MATCH_STATUS_EVENT: 'MatchStatusEvent',
  MATCH_SCORE_EVENT: 'MatchScoreEvent',
}

class MMMatchSocket {
  listenerIndex = null

  setListenerIndex = (newListenerIndex) => {
    this.listenerIndex = newListenerIndex
  }

  getListenerIndex = () => this.listenerIndex

  subscribe = (matchId, onSocketMessage) => {
    const MMMatchTopic = getMMMatchTopic(matchId)
    return webSocket.subscribeToTopic(MMMatchTopic, onSocketMessage).then(
      index => this.setListenerIndex(index),
    )
  }

  unsubscribe = (matchId) => {
    const MMMatchTopic = getMMMatchTopic(matchId)
    return webSocket.unsubscribeFromTopic(MMMatchTopic, this.getListenerIndex())
  }
}

export default new MMMatchSocket()
