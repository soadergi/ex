import {
  branch,
  compose,
  renderNothing,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { createStructuredSelector } from 'reselect'

import { lobbyMapsSelectors } from 'weplay-competitive/reduxs/lobbyMaps'
import { tournamentMembersSelectors } from 'weplay-competitive/reduxs/tournamentMembers'
import { LOBBY_MAP_STATUSES } from 'weplay-competitive/constants/lobbyMapStatuses'
import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'

const filterParticipantMaps = (id, maps) => R.filter(
  R.allPass([
    R.pathEq(['relationships', 'member', 'id'], id),
    R.anyPass([
      R.propEq('status', LOBBY_MAP_STATUSES.USER_PICK),
      R.propEq('status', LOBBY_MAP_STATUSES.SERVER_PICK_TIMEOUT),
    ]),
  ]),
)(maps)

const container = compose(
  connect(createStructuredSelector({
    // selectors
    getLobbyMapById: lobbyMapsSelectors.getRecordByIdSelector,
    getTournamentMemberById: tournamentMembersSelectors.getRecordByIdSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'match',
    'getTournamentMemberById',
  ], ({
    match,
    getTournamentMemberById,
  }) => ({
    homeParticipantId: R.pipe(
      R.path(['relationships', 'player1', 'id']),
      getTournamentMemberById,
      R.pathOr(NaN, ['relationships', 'member', 'id']),
    )(match),
    awayParticipantId: R.pipe(
      R.path(['relationships', 'player2', 'id']),
      getTournamentMemberById,
      R.pathOr(NaN, ['relationships', 'member', 'id']),
    )(match),
  })),

  withPropsOnChange([
    'lobby',
    'getLobbyMapById',
  ], ({
    lobby,
    getLobbyMapById,
  }) => {
    if (!lobby.isFetched) {
      return {}
    }
    return ({
      maps: R.pipe(
        R.path(['relationships', 'maps']),
        R.map(R.pipe(
          R.prop('id'),
          getLobbyMapById,
        )),
      )(lobby),
      isMapPoolSizeMoreThanOne: R.pipe(
        R.path(['relationships', 'maps']),
        maps => maps.length > 1,
      )(lobby),
    })
  }),

  branch(
    ({ maps, homeParticipantId, awayParticipantId }) => !maps || !homeParticipantId || !awayParticipantId,
    renderNothing,
  ),

  withPropsOnChange([
    'maps',
    'homeParticipantId',
    'awayParticipantId',
  ], ({
    maps,
    homeParticipantId,
    awayParticipantId,
  }) => ({
    homeParticipantMaps: filterParticipantMaps(homeParticipantId, maps),
    awayParticipantMaps: filterParticipantMaps(awayParticipantId, maps),
    serverMaps: R.filter(
      R.propEq('status', LOBBY_MAP_STATUSES.SERVER_PICK),
    )(maps),
    coinMemberId: R.pipe(
      R.head,
      R.path(['relationships', 'member', 'id']),
    )(maps),
  })),

  withDiscipline,
  withPropsOnChange([
    'serverMaps',
    'discipline',
  ], ({
    serverMaps,
    discipline,
  }) => ({
    showServerPick: Boolean(discipline === 'dota2' ? serverMaps.length : serverMaps),
  })),

)

export default container
