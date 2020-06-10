import * as R from 'ramda'
import { compose, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { createTournamentGroupBracketSelector } from 'weplay-competitive/reduxs/commonSelectors/tournaments'
import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'
import { tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'
import { GAME_MODE_TYPES } from 'weplay-competitive/constants/gameModeTypes'
import { createTournamentGameModeSelector } from 'weplay-competitive/reduxs/commonSelectors/gameModes'

const mapPropsToTournamentId = R.pipe(
  R.path([
    'match', 'params', 'tournamentId',
  ]),
  Number,
)

const container = compose(
  withRouter,
  withDiscipline,
  connect(createStructuredSelector({
    // selectors
    bracketData: createTournamentGroupBracketSelector(mapPropsToTournamentId),
    tournament: tournamentsSelectors.createRecordByIdSelector(mapPropsToTournamentId),
    gameMode: createTournamentGameModeSelector(mapPropsToTournamentId),
  }), {
    // actionCreators
  }),
  withPropsOnChange([
    'bracketData',
  ], ({ bracketData }) => ({
    bracketMatrix: bracketData.bracketMatrix,
    groupMatches: bracketData.groupMatches,
    tournamentMembersIds: bracketData.tournamentMembersIds,
    scoreArray: bracketData.scoreArray,
  })),
  withPropsOnChange([
    'tournament',
  ], ({ tournament }) => ({
    tournamentId: tournament.id,
    tournamentName: tournament.name,
  })),
  withPropsOnChange([
    'gameMode',
  ], ({ gameMode }) => ({
    isSingleGameMode: gameMode.gameModeType === GAME_MODE_TYPES.SINGLE,
  })),
)

export default container
