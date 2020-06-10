import {
  compose,
  lifecycle,
  withHandlers,
} from 'recompose'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import webSocket, { WS_TOPICS } from 'weplay-singleton/socket'
import { ENV_NAMES, getEnvironment } from 'weplay-singleton/helpers/getEnvironment'
import { API_HOSTS, getHostByGlobalScope } from 'weplay-singleton/helpers/getHostByGlobalScope'
import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import { triggerMutualModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import { getUserWallet } from 'weplay-core/reduxs/wallets/actions'
import {
  toggleNotification,
} from 'weplay-core/reduxs/_legacy/lobbyNotifications/actions'
import {
  apiHostSelector,
  globalScopeSelector,
  originSelector,
} from 'weplay-core/reduxs/common/selectors'
import { getUser } from 'weplay-core/reduxs/_legacy/auth/actions'
import { getUserNotifications } from 'weplay-core/reduxs/notifications/actions'
import {
  currentUserSelector,
  userIdSelector,
} from 'weplay-core/reduxs/_legacy/auth/reducer'
import { dispatchPartialModelAction } from 'weplay-core/reduxs/_factories/utils'

import { MUTUAL_MODALS } from 'weplay-components/ModalBase/config'
import withMatchAlert from 'weplay-components/withMatchAlert'

import { matchesActions } from 'weplay-competitive/reduxs/matches'

import { handlePrivateMessage } from './handlePrivateMessage'

const WS_PORT = 8443
const WS_URI = 'websocket-streaming-service'
const getUserTopic = userId => `${WS_TOPICS.PRIVATE}${userId}`

const container = compose(
  withLocale,
  withRouteInfo,

  connect(createStructuredSelector({
    // TODO: move this two selectors up to App.js
    globalScope: globalScopeSelector,
    origin: originSelector,
    // ENDTODO: move this two selectors up to App.js
    currentUser: currentUserSelector,
    currentUserId: userIdSelector,
    apiHost: apiHostSelector,
  }), {
    getUser,
    getUserWallet: getUserWallet.request,
    queryMatches: matchesActions.queryRecords.request,
    toggleNotification,
    dispatchPartialModelAction,
    getUserNotifications: getUserNotifications.request,
    triggerMutualModal,
  }),

  withMatchAlert,

  withHandlers({
    handlePrivateEvent: handlePrivateMessage,
  }),

  withHandlers(() => {
    let listenerIndex
    return {
      setListenerIndex: () => (newListenerIndex) => {
        listenerIndex = newListenerIndex
      },
      getListenerIndex: () => () => listenerIndex,
    }
  }),

  withHandlers({
    connectToSocket: props => () => {
      const wsHost = getEnvironment(origin) === ENV_NAMES.PROD
        ? API_HOSTS[ENV_NAMES.PROD]
        : getHostByGlobalScope(props.globalScope)
      return webSocket.connect(`${wsHost}:${WS_PORT}/${WS_URI}`)
    },
  }),

  withHandlers({
    connectToPrivateTopic: props => () => {
      webSocket.subscribeToTopic(
        getUserTopic(props.currentUserId),
        props.handlePrivateEvent,
      ).then(props.setListenerIndex)
    },
  }),

  lifecycle({
    componentDidMount() {
      const {
        getUser, // eslint-disable-line no-shadow
        getUserWallet, // eslint-disable-line no-shadow
        currentUserId,
        getUserNotifications, // eslint-disable-line no-shadow
        globalScope,
        connectToPrivateTopic,
        connectToSocket,
      } = this.props

      // Code below needs for showing page from the top after refresh it
      globalScope.onbeforeunload = () => {
        setTimeout(() => {
          globalScope.scrollTo(0, 0)
        }, 0)
        return null
      }
      if (currentUserId) {
        getUser()
          .then(connectToSocket)
          .then(connectToPrivateTopic)
        getUserWallet()
        getUserNotifications({ // TODO @Artem Add withNotifications HOC
          params: {
            'page[offset]': 0,
            'page[limit]': 20,
            sort: '-create_datetime',
          },
        })
      } else {
        connectToSocket()
      }
      if (queryString.parse(this.props.location.search).subscribe_success === 'true') {
        this.props.triggerMutualModal(MUTUAL_MODALS.CONFIRM_SUBSCRIPTION)
      }
    },

    componentDidUpdate(prevProps) {
      const {
        currentUserId,
        getListenerIndex,
        location,
        locale,
        globalScope,
        routeInfo,
        connectToPrivateTopic,
        connectToSocket,
      } = this.props
      const prevUserId = prevProps.currentUserId
      const listenerIndex = getListenerIndex()
      if (currentUserId !== prevUserId) {
        if (!currentUserId && listenerIndex >= 0) {
          webSocket.unsubscribeFromTopic(getUserTopic(prevUserId), listenerIndex)
        }
        if (currentUserId) {
          connectToSocket()
            .then(connectToPrivateTopic)
        } else {
          connectToSocket()
        }
      }

      // TODO: @Andrew, move this logic to the history listener (Main/container.js)
      // Code below needs for showing the page from the top,
      // after opening another page and for moving to the previous page)
      const isPageSectionChange = routeInfo.name === prevProps.routeInfo.name
        && routeInfo.section !== prevProps.routeInfo.section

      if (location.pathname !== prevProps.location.pathname && locale === prevProps.locale && !isPageSectionChange) {
        setTimeout(() => {
          globalScope.scrollTo(0, 0)
        }, 0)
      }
    },
  }),
)

export default container
