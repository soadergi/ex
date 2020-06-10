import * as R from 'ramda'

import { EVENTS } from 'weplay-competitive/services/lobbySocket'
import { MATCH_STATUSES } from 'weplay-competitive/constants/matchStatuses'
import { LOBBY_STATUSES } from 'weplay-competitive/constants/lobbyStatuses'

export const createOnLobbySocketMessage = ({
  match,
  playMatchAlertSound,
  setStartVoteDatetime,
  setShowRestartLobbyAlert,
  dispatchPartialModelAction,
}) => (message) => {
  switch (message.meta.type) {
    case EVENTS.MATCH_STARTED_EVENT:
      dispatchPartialModelAction({
        partialModel: {
          type: 'Match',
          id: match.id,
          attributes: {
            status: MATCH_STATUSES.VOTING,
          },
        },
        service: 'tournament-service',
      })
      dispatchPartialModelAction({
        partialModel: {
          type: 'Lobby',
          id: Number(message.data.data.id),
          attributes: {
            status: LOBBY_STATUSES.ONGOING,
          },
        },
        service: 'tournament-service',
      })
      setStartVoteDatetime(message.data.data.attributes.startVoteDatetime)
      playMatchAlertSound()
      break
    case EVENTS.MATCH_CANCELED_EVENT:
      dispatchPartialModelAction({
        partialModel: {
          type: 'Match',
          id: match.id,
          attributes: {
            status: MATCH_STATUSES.CANCELED,
          },
        },
        service: 'tournament-service',
      })
      dispatchPartialModelAction({
        partialModel: {
          type: 'Lobby',
          id: Number(message.data.data.id),
          attributes: {
            status: LOBBY_STATUSES.CANCELED,
          },
        },
        service: 'tournament-service',
      })
      break
    case EVENTS.VOTE_EVENT:
      dispatchPartialModelAction({
        partialModel: {
          ...message.data.data,
          id: Number(message.data.data.id),
          relationships: {
            ...message.data.data.relationships,
            map: {
              data: {
                ...message.data.data.relationships.map.data,
                id: Number(message.data.data.relationships.map.data.id),
              },
            },
            lobby: {
              data: {
                ...message.data.data.relationships.lobby.data,
                id: Number(message.data.data.relationships.lobby.data.id),
              },
            },
          },
        },
        service: 'tournament-service',
      })
      break
    case EVENTS.MATCH_ENDED_EVENT:
      dispatchPartialModelAction({
        partialModel: {
          type: 'Match',
          id: match.id,
          attributes: {
            status: MATCH_STATUSES.SETUP_SERVER,
          },
        },
        service: 'tournament-service',
      })

      dispatchPartialModelAction({
        partialModel: {
          type: 'Lobby',
          id: Number(message.data.data.id),
          attributes: {
            status: LOBBY_STATUSES.ENDED,
          },
        },
        service: 'tournament-service',
      })
      break
    case EVENTS.MATCH_FINISHED_EVENT:
    case EVENTS.MATCH_ONGOING_EVENT:
    case EVENTS.MATCH_SCORE_EVENT:
    case EVENTS.MEMBER_EVENT:
      dispatchPartialModelAction({
        partialModel: {
          ...message.data.data,
          id: Number(message.data.data.id),
        },
        service: 'tournament-service',
      })
      break
    case EVENTS.MATCH_CHANGE_SCORE_EVENT:
      message.data.data.forEach((matchResult) => {
        dispatchPartialModelAction({
          partialModel: {
            type: 'MatchResult',
            id: Number(matchResult.id),
            attributes: {
              status: matchResult.attributes.status,
            },
            relationships: {
              ...matchResult.relationships,
              match: {
                data: {
                  ...matchResult.relationships.match.data,
                  id: Number(matchResult.relationships.match.data.id),
                },
              },
              rounds: {
                data: matchResult.relationships.rounds.data,
              },
            },
          },
          service: 'tournament-service',
        })
      })

      if (message.data.included) {
        R.map(round => dispatchPartialModelAction({
          partialModel: {
            ...round,
            id: Number(round.id),
          },
          service: 'tournament-service',
        }))(message.data.included.matchRound)
      }
      break
    case EVENTS.RESTART_LOBBY_EVENT:
      setShowRestartLobbyAlert(true)
      break
    default:
      console.warn(
        'UNHANDLED MESSAGE FROM TOPIC',
        message,
      )
  }
}
