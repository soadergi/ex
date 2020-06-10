import * as R from 'ramda'
import {
  compose,
  lifecycle,
  withProps,
  withStateHandlers,
  withPropsOnChange,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'
import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { matchResultActions, matchResultSelectors } from 'weplay-competitive/reduxs/matchResults'
import { matchRoundSelectors } from 'weplay-competitive/reduxs/matchRounds'
import { voteItemsSelectors } from 'weplay-competitive/reduxs/voteItems'
import { lobbyMapsSelectors } from 'weplay-competitive/reduxs/lobbyMaps'
import { membersSelectors } from 'weplay-competitive/reduxs/members'
import { tournamentMembersSelectors } from 'weplay-competitive/reduxs/tournamentMembers'
import { MATCH_MEMBER_PARTICIPATION_TYPES } from 'weplay-competitive/constants/matchMemberParticipationTypes'
import { MATCH_GAME_STATUSES } from 'weplay-competitive/constants/matchGameStatuses'
import { LOBBY_MAP_VOTES } from 'weplay-competitive/constants/lobbyMapVotes'
import { DISCIPLINES } from 'weplay-competitive/config/disciplines'

const container = compose(
  withLocale,
  withRouter,
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),
  withProps(({
    discipline,
    t,
  }) => ({
    noMatchResults: [
      {
        id: 0,
        voteItem: {
          name: t(`competitive.match.matchInfo.empty.${DISCIPLINES[discipline].pool}`),
        },
        round: {
          score1: 0,
          score2: 0,
        },
        lobbyMap: {
          isFetched: false,
          relationships: {
            map: {
              id: NaN,
            },
            member: {
              id: NaN,
            },
          },
        },
        isMemberWhoVotedThisMapAway: false,
        winner: '',
        isRoundInProgress: false,
      },
    ],
  })),
  withProps(R.pipe(
    R.path(['match', 'params', 'matchId']),
    Number,
    R.objOf('matchId'),
  )),
  connect(createStructuredSelector({
    // selectors
    getMatchResult: matchResultSelectors.getRecordByIdSelector,
    getVoteItem: voteItemsSelectors.getRecordByIdSelector,
    getRound: matchRoundSelectors.getRecordByIdSelector,
    allLobbyMaps: lobbyMapsSelectors.allRecordsSelector,
    getMemberById: membersSelectors.getRecordByIdSelector,
    getTournamentMemberById: tournamentMembersSelectors.getRecordByIdSelector,
  }), {
    // actionCreators
    queryMatchInfo: matchResultActions.queryRecords.request,
  }),
  withStateHandlers(
    { matchRoundsIds: [] },
    {
      setMatchRoundsIds: () => matchRoundsIds => ({ matchRoundsIds }),
    },
  ),
  withPropsOnChange([
    'matchRoundsIds',
    'awayTournamentMemberIds',
    'getTournamentMemberById',
    'getMatchResult',
    'getVoteItem',
    'getRound',
    'allLobbyMaps',
    'noMatchResults',
    'matchStatus',
  ], ({
    matchRoundsIds,
    awayTournamentMemberIds,
    getTournamentMemberById,
    getMatchResult,
    getVoteItem,
    getRound,
    allLobbyMaps,
    noMatchResults,
  }) => {
    const membersIds = R.map(R.pipe(
      getTournamentMemberById,
      R.pathOr(NaN, ['relationships', 'member', 'id']),
    ))(awayTournamentMemberIds)
    return {
      matchResults: matchRoundsIds.length > 0
        ? R.map(R.pipe(
          getMatchResult,
          (result) => {
            const round = R.pipe(
              R.pathOr(NaN, ['relationships', 'rounds', '0', 'id']),
              getRound,
              R.pickAll(['score1', 'score2']),
            )(result)

            const voteItemId = R.path(['relationships', 'voteItem', 'id'])(result)

            const lobbyMap = R.pipe(
              R.find(R.pipe(
                R.pathOr(NaN, ['relationships', 'map', 'id']),
                R.equals(voteItemId),
              )),
              R.defaultTo({
                relationships: {},
                vote: LOBBY_MAP_VOTES.DROP,
                isFetched: false,
              }),
            )(allLobbyMaps)

            return {
              id: result.id,
              voteItem: R.pipe(
                R.pathOr(NaN, ['relationships', 'voteItem', 'id']),
                getVoteItem,
                R.pick(['name']),
              )(result),
              round,
              lobbyMap,
              isMemberWhoVotedThisMapAway: R.contains(
                R.pathOr(NaN, ['relationships', 'member', 'id'])(lobbyMap), membersIds,
              ),
              winner: R.cond([
                [
                  () => result.status === MATCH_GAME_STATUSES.FINISHED
                  && round.score1 > round.score2, R.always(MATCH_MEMBER_PARTICIPATION_TYPES.HOME),
                ],
                [
                  () => result.status === MATCH_GAME_STATUSES.FINISHED
                  && round.score2 > round.score1, R.always(MATCH_MEMBER_PARTICIPATION_TYPES.AWAY),
                ],
                [
                  R.T, R.always(''),
                ],
              ])(),
              isRoundInProgress: result.status === MATCH_GAME_STATUSES.ONGOING
              || result.status === MATCH_GAME_STATUSES.PAUSE,
            }
          },
        ))(matchRoundsIds)
        : noMatchResults,
    }
  }),
  withHandlers({
    getMatchInfo: props => () => {
      props.queryMatchInfo({
        'filter[match.id]': props.matchId,
        included: 'rounds',
      })
        .then(
          R.pipe(
            R.prop(['data']),
            R.map(R.pipe(
              R.prop(['id']),
            )),
          ),
        )
        .then(props.setMatchRoundsIds)
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.getMatchInfo()
    },
    componentDidUpdate(prevProps) {
      if (
        prevProps.matchId !== this.props.matchId
        || (prevProps.matchStatus !== this.props.matchStatus)
      ) {
        this.props.getMatchInfo()
      }
    },
  }),
)

export default container
