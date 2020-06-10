import { camelizeKeys } from '../camelizeKeys'

export const WS_TOPICS = {
  PRIVATE: '/wss/output/private/',
  LOBBY: '/wss/output/lobby/',
  COMMENTS: '/wss/output/comments/',
  MM: '/wss/output/matchmaking/',
  MM_CHECK_IN: '/wss/output/matchmaking-checkin/',
  MM_VOTING: '/wss/output/matchmaking-voting/',
}

const SOCKET_RECONNECT_DELAY = 1000

class WebSocket {
  constructor() {
    this.listeners = {}
    this.connectPromise = null
  }

  connect = (socketHost) => {
    const connectPromise = Promise.all([
      import(
        /* webpackPrefetch: true */
          'sockjs-client' // eslint-disable-line
      ),
      import(
        /* webpackPrefetch: true */
          '@stomp/stompjs' // eslint-disable-line
      ),
    ])
      .then(([{ default: SockJS }, { Stomp }]) => {
        const stompClient = Stomp.over(() => new SockJS(socketHost))
        stompClient.configure({
          reconnectDelay: SOCKET_RECONNECT_DELAY,
        })
        return new Promise((resolve/* , reject */) => {
          stompClient.connect({}, () => {
            resolve(stompClient)
            // TODO: @ILLIA HANDLE ERROR with REJECT here
          })
        })
      })
    this.connectPromise = connectPromise
    return connectPromise
  }

  disconnect = () => {
    this.connectPromise.then((stompClient) => {
      stompClient.disconnect()
    })
  }

  subscribeToTopic = (topic, newListener) => new Promise(
    (resolve) => {
      if (topic in this.listeners) {
        const indexOfNewListener = this.listeners[topic].indexOf(newListener)
        if (indexOfNewListener !== -1) {
          return resolve(indexOfNewListener)
        }
        this.listeners[topic].push(newListener)
        return resolve(this.listeners.length - 1)
      }
      this.listeners[topic] = [newListener]
      return this.connectPromise
        .then((stompClient) => {
          stompClient.subscribe(topic, this.getCallListeners(topic))
        })
        .then(() => resolve(0))
    },
  )

  getTopicListeners = (topic) => {
    const listeners = this.listeners[topic] || []
    return listeners.filter(Boolean)
  }

  getCallListeners = topic => (rawMessage) => {
    const message = JSON.parse(rawMessage.body)
    const camelizedDataMessage = {
      ...message,
      data: camelizeKeys(message.data),
    }
    this.getTopicListeners(topic).forEach(listener => listener(camelizedDataMessage))
  }

  unsubscribeFromTopic = (topic, indexOfListener) => {
    if (indexOfListener === undefined) {
      console.warn('PROBABLY ERROR - U R TRYING UNSUBSCRIBE WHEN NOT SUBSCRIBED')
      return
    }
    this.listeners[topic][indexOfListener] = null
    const isLastListener = !this.getTopicListeners(topic).length
    if (isLastListener) {
      this.connectPromise.then((stompClient) => {
        stompClient.unsubscribe(topic)
        delete this.listeners[topic]
      })
    }
  }

  // TODO: remove this when tokenId will work with cookies
  send = (userId, topic, message) => {
    this.connectPromise.then((stompClient) => {
      stompClient.send(
        topic,
        {
          user_id: userId,
        },
        JSON.stringify(message),
      )
    })
  }
}

export default new WebSocket()
