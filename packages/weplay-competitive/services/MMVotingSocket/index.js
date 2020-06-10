import webSocket, { WS_TOPICS } from 'weplay-singleton/socket'

const getMMVotingTopic = matchId => `${WS_TOPICS.MM_VOTING}${matchId}`

export const EVENTS = {
  VOTING_EVENT: 'VOTING_EVENT',
}

const MM_VOTING_SERVICE_INPUT_TOPIC = '/wss/input/matchmaking-voting'

class MMVotingSocket {
  listenerIndex = null

  setListenerIndex = (newListenerIndex) => {
    this.listenerIndex = newListenerIndex
  }

  getListenerIndex = () => this.listenerIndex

  subscribe = (matchId, onSocketMessage) => {
    const MMVotingTopic = getMMVotingTopic(matchId)
    return webSocket.subscribeToTopic(MMVotingTopic, onSocketMessage).then(
      index => this.setListenerIndex(index),
    )
  }

  unsubscribe = (matchId) => {
    const MMVotingTopic = getMMVotingTopic(matchId)
    return webSocket.unsubscribeFromTopic(MMVotingTopic, this.getListenerIndex())
  }

  sendVoteMapEvent = ({
    voteItemId,
    matchId,
    userId,
  }) => {
    const voteEvent = {
      meta: {
        type: EVENTS.VOTING_EVENT,
      },
      data: {
        vote_item_id: voteItemId,
        match_id: matchId,
        game_mode: 'ONE_ON_ONE',
      },
    }
    return webSocket.send(userId, MM_VOTING_SERVICE_INPUT_TOPIC, voteEvent)
  }
}

export default new MMVotingSocket()
