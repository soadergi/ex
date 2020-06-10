import * as R from 'ramda'
import {
  compose,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { goTo, NAMES } from 'weplay-core/routes'
import transliterate from 'weplay-core/helpers/translit'

import { voteItemsSelectors } from 'weplay-competitive/reduxs/voteItems'
import { lobbiesSelectors } from 'weplay-competitive/reduxs/lobbies'
import { tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'
import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'
import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'

const container = compose(
  withRouter,
  withDiscipline,
  connect(createStructuredSelector({
    getVoteItemById: voteItemsSelectors.getRecordByIdSelector,
    getLobbyById: lobbiesSelectors.getRecordByIdSelector,
    getTournamentById: tournamentsSelectors.getRecordByIdSelector,
    getGameModeById: gameModesSelectors.getRecordByIdSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'matchItem',
    'getLobbyById',
    'getVoteItemById',
    'getTournamentById',
    'getGameModeById',
  ], ({
    matchItem,
    getLobbyById,
    getVoteItemById,
    getTournamentById,
    getGameModeById,
  }) => ({
    lobby: getLobbyById(R.pathOr(NaN, ['relationships', 'lobby', 'id'])(matchItem)),
    votePoolNames: R.pipe(
      R.pathOr(NaN, ['relationships', 'lobby', 'id']),
      getLobbyById,
      R.pathOr([], ['settings', 'votePool']),
      R.values,
      R.map(R.pipe(
        getVoteItemById,
        R.prop('name'),
      )),
    )(matchItem),
    tournament: R.pipe(
      R.pathOr(NaN, ['relationships', 'tournament', 'id']),
      getTournamentById,
    )(matchItem),
    gameModeTitle: R.pipe(
      R.pathOr(NaN, ['relationships', 'tournament', 'id']),
      getTournamentById,
      R.path(['relationships', 'gameMode', 'id']),
      getGameModeById,
      R.prop('title'),
    )(matchItem),
  })),
  withHandlers({
    goToMatchPage: ({
      history,
      matchItem,
      tournament,
      discipline,
    }) => () => {
      goTo({
        name: NAMES.MATCH,
        history,
        params: {
          matchId: matchItem.id,
          tournamentId: matchItem.relationships.tournament.id,
          tournamentName: transliterate(R.pathOr('', ['name'], tournament)),
          discipline,
        },
      })
    },
  }),

)

export default container
