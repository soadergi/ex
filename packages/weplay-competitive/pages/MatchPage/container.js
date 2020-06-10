/* eslint-disable max-lines */
import * as R from 'ramda'
import {
  compose,
  lifecycle,
  withHandlers,
  withProps,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { goTo, NAMES } from 'weplay-core/routes'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'

import withPreloader from 'weplay-components/withPreloader'
import withTabs from 'weplay-components/withTabs'
import withServerRender from 'weplay-components/withServerRender'

import { createParticipantActiveSelector } from 'weplay-competitive/reduxs/commonSelectors/matchMembers'
import { matchesSelectors } from 'weplay-competitive/reduxs/matches'
import { matchMembersSelectors } from 'weplay-competitive/reduxs/matchMembers'
import { MATCH_MEMBER_PARTICIPATION_TYPES } from 'weplay-competitive/constants/matchMemberParticipationTypes'
import { MATCH_STATUSES } from 'weplay-competitive/constants/matchStatuses'
import withHotjar from 'weplay-competitive/HOCs/hotjar/withHotjar'
import { tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'
import { voteItemsSelectors } from 'weplay-competitive/reduxs/voteItems'
import { getInitialData } from 'weplay-competitive/pages/MatchPage/actionChains'
import withLobbySockets from 'weplay-competitive/HOCs/withLobbySockets'
import withDisciplineAccessPage from 'weplay-competitive/HOCs/withDisciplineAccessPage'
import { matchStatisticSelector } from 'weplay-competitive/reduxs/statistic/reducer'
import { DISCIPLINES } from 'weplay-competitive/config/disciplines'
import { GAME_MODE_TYPES } from 'weplay-competitive/constants/gameModeTypes'
import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'

const mapPropsToMatchId = R.path([
  'match', 'params', 'matchId',
])

const container = compose(
  withDisciplineAccessPage,
  withLocale,
  withPropsOnChange([
    'match',
  ], R.pipe(
    R.path(['match', 'params', 'matchId']),
    Number,
    R.objOf('matchId'),
  )),
  withProps(({ match }) => ({
    mathUrl: match,
  })),
  withHotjar,
  withServerRender(getInitialData),
  connect(createStructuredSelector({
    // selectors
    match: matchesSelectors.createRecordByIdSelector(mapPropsToMatchId),
    allMatchMembers: matchMembersSelectors.allRecordsSelector,
    voteItems: voteItemsSelectors.allRecordsSelector,
    getTournamentById: tournamentsSelectors.getRecordByIdSelector,
    getGameModeById: gameModesSelectors.getRecordByIdSelector,
    statistic: matchStatisticSelector,
    isHomeParticipantActive: createParticipantActiveSelector(mapPropsToMatchId, MATCH_MEMBER_PARTICIPATION_TYPES.HOME),
    isAwayParticipantActive: createParticipantActiveSelector(mapPropsToMatchId, MATCH_MEMBER_PARTICIPATION_TYPES.AWAY),
  }), {
    // actionCreators
  }),
  withPageViewAnalytics(),
  withPreloader({
    mapPropsToIsLoading: R.pipe(
      R.path(['match', 'isFetched']),
      isFetched => !isFetched,
    ),
    isFullScreen: true,
  }),

  withPropsOnChange([
    'match',
  ], ({
    match,
  }) => ({
    gameId: R.pathOr(NaN, ['relationships', 'game', 'id'])(match),
    lobbyId: R.pathOr(NaN, ['relationships', 'lobby', 'id'])(match),
  })),

  withPropsOnChange([
    'gameId',
  ], ({
    gameId,
  }) => ({
    disciplineFromResponse: R.pipe(
      R.values,
      R.find(R.propEq('id', gameId)),
      R.prop('url'),
    )(DISCIPLINES),
  })),

  withPropsOnChange([
    'statistic',
  ], ({
    statistic,
  }) => ({
    mapsStats: statistic.mapsStats,
  })),

  withPropsOnChange([
    'match',
    'getTournamentById',
    'getGameModeById',
  ], ({
    match,
    getTournamentById,
    getGameModeById,
  }) => {
    const tournamentName = R.pipe(
      R.pathOr(NaN, ['relationships', 'tournament', 'id']),
      getTournamentById,
      R.pathOr('', ['name']),
    )(match)
    const gameMode = R.pipe(
      R.pathOr(NaN, ['relationships', 'tournament', 'id']),
      getTournamentById,
      R.pathOr(NaN, ['relationships', 'gameMode', 'id']),
      getGameModeById,
    )(match)
    const tournamentId = R.pathOr(NaN, ['relationships', 'tournament', 'id'])(match)
    return ({
      seoParams: {
        matchId: String(R.pathOr('', ['id'])(match)),
        tournamentName,
      },
      tournamentId,
      gameMode,
    })
  }),

  withPropsOnChange([
    'voteItems',
  ], ({
    voteItems,
  }) => ({
    isVoteItemsNotEmpty: voteItems.length > 0,
  })),

  withPropsOnChange([
    'match',
    'getTournamentMemberById',
  ], ({
    match,
  }) => ({
    matchPlayer1Id: R.pipe(
      R.path(['relationships', 'player1', 'id']),
    )(match),
    matchPlayer2Id: R.pipe(
      R.path(['relationships', 'player2', 'id']),
    )(match),
  })),

  withPropsOnChange([
    'allMatchMembers',
    'matchId',
    'match',
    'isHomeParticipantActive',
    'isAwayParticipantActive',
    't',
    'gameMode',
    'disciplineName',
    'tournamentDiscipline',
  ], ({
    allMatchMembers,
    matchId,
    match,
    isHomeParticipantActive,
    isAwayParticipantActive,
    t,
    gameMode,
    disciplineName,
    tournamentDiscipline,
  }) => {
    const currentMatchMembers = allMatchMembers.filter(R.pathEq(
      ['relationships', 'match', 'id'],
      matchId,
    ))
    const homeMatchMembers = currentMatchMembers.filter(
      R.propEq('participationType', MATCH_MEMBER_PARTICIPATION_TYPES.HOME),
    )
    const awayMatchMembers = currentMatchMembers.filter(
      R.propEq('participationType', MATCH_MEMBER_PARTICIPATION_TYPES.AWAY),
    )
    let emptyText = ''
    switch (match.status) {
      case MATCH_STATUSES.TECHNICAL_DEFEAT:
        emptyText = t(`competitive.match.${tournamentDiscipline.url}.techDefeat`)
        break
      case MATCH_STATUSES.CANCELED:
        emptyText = t('competitive.match.matchCanceled')
        break
      case MATCH_STATUSES.FINISHED:
        if (!(isHomeParticipantActive && isAwayParticipantActive)) {
          emptyText = gameMode.gameModeType === GAME_MODE_TYPES.SINGLE
            ? t('competitive.match.techDefeatByOffline')
            : t('competitive.match.techDefeatByOfflineTeam', { disciplineName })
        } else {
          emptyText = ''
        }
        break
      default:
        emptyText = ''
    }

    const homeTournamentMemberIds = homeMatchMembers.map(R.path([
      'relationships',
      'tournamentMember',
      'id',
    ]))
    const awayTournamentMemberIds = awayMatchMembers.map(R.path([
      'relationships',
      'tournamentMember',
      'id',
    ]))
    return ({
      homeMatchMembers,
      homeTournamentMemberIds,

      awayMatchMembers,
      awayTournamentMemberIds,

      matchMembers: R.concat(homeMatchMembers, awayMatchMembers),
      tournamentMemberIds: homeTournamentMemberIds.concat(awayTournamentMemberIds),
      emptyText,
    })
  }),
  withLobbySockets,
  withProps({
    tabs: R.values(MATCH_MEMBER_PARTICIPATION_TYPES),
  }),
  withTabs,
  /* eslint-disable no-shadow */
  withHandlers({
    handlerRefreshLobby: ({
      setShowRestartLobbyAlert,
      matchId,
      history,
      getInitialData,
      sendMemberStatusOnlineEvent,
    }) => () => {
      getInitialData({ matchId, history })
        .finally(() => {
          setShowRestartLobbyAlert(false)
          sendMemberStatusOnlineEvent()
        })
    },
  }),
  lifecycle({
    componentDidUpdate() {
      if (this.props.disciplineFromResponse && this.props.discipline
        && this.props.disciplineFromResponse !== this.props.discipline) {
        goTo({
          history: this.props.history,
          name: NAMES.NOT_FOUND,
          method: 'replace',
        })
      }
    },
  }),
)

export default container
