import * as R from 'ramda'
import {
  compose,
  lifecycle,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import transliterate from 'weplay-core/helpers/translit'
import { goTo, NAMES } from 'weplay-core/routes'

import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'
import { teamsActions } from 'weplay-competitive/reduxs/teams'
import { membersActions } from 'weplay-competitive/reduxs/members'
import { GAME_MODE_TYPES } from 'weplay-competitive/constants/gameModeTypes'
import { createTournamentGameModeSelector } from 'weplay-competitive/reduxs/commonSelectors/gameModes'
import { createTournamentMemberIdsSelector } from 'weplay-competitive/reduxs/commonSelectors/tournamentMembers'
import { AT__TOURNAMENTS_DETAILS_PARTICIPANTS } from 'weplay-competitive/analytics/amplitude'

const mapPropsToTournamentId = R.path([
  'match', 'params', 'tournamentId',
])

const container = compose(
  withRouter,
  withDiscipline,
  connect(createStructuredSelector({
    // selectors
    gameMode: createTournamentGameModeSelector(mapPropsToTournamentId),
    tournamentMembersIds: createTournamentMemberIdsSelector(mapPropsToTournamentId),
  }), {
    // actionCreators
    queryMembers: membersActions.queryRecords.request,
    queryTeams: teamsActions.queryRecords.request,
  }),
  withPropsOnChange([
    'gameMode',
  ], ({
    gameMode,
  }) => ({
    isSingleTournament: gameMode.gameModeType === GAME_MODE_TYPES.SINGLE,
  })),
  withAnalytics,
  withHandlers({
    handleClickMoreParticipants: ({
      history,
      tournament,
      discipline,
      logAmplitude,
    }) => () => {
      logAmplitude(AT__TOURNAMENTS_DETAILS_PARTICIPANTS, {
        Source: 'Participants block',
      })
      goTo({
        name: NAMES.TOURNAMENT_PARTICIPANTS,
        history,
        params: {
          tournamentId: tournament.id,
          tournamentName: transliterate(tournament.name),
          discipline,
        },
      })
    },
  }),
  withHandlers({
    getParticipantsInfo: props => () => {
      const queryParams = {
        'filter[id]': props.tournamentMembersIds.join(','),
        'page[limit]': props.tournamentMembersIds.length,
      }
      if (props.gameMode.gameModeType === GAME_MODE_TYPES.TEAM) {
        props.queryTeams(queryParams)
      } else {
        props.queryMembers(queryParams)
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.getParticipantsInfo()
    },
  }),
)

export default container
