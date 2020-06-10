// eslint-disable-line max-lines
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
  lifecycle,
  withHandlers,
} from 'recompose'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import withMoment from 'weplay-core/HOCs/withMoment'
import { pathWithParamsByRoute, NAMES } from 'weplay-core/routes'
import transliterate from 'weplay-core/helpers/translit'
import { capitalizeFirstLetter } from 'weplay-core/helpers/capitalizeFirstLetter'

import { lobbiesSelectors } from 'weplay-competitive/reduxs/lobbies'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'
import { tournamentMembersSelectors } from 'weplay-competitive/reduxs/tournamentMembers'
import { tournamentsSelectors, tournamentsActions } from 'weplay-competitive/reduxs/tournaments'
import {
  createParticipantActiveSelector,
  countOnlineParticipantsSelector,
} from 'weplay-competitive/reduxs/commonSelectors/matchMembers'
import { MATCH_STATUSES } from 'weplay-competitive/constants/matchStatuses'
import { MATCH_MEMBER_PARTICIPATION_TYPES } from 'weplay-competitive/constants/matchMemberParticipationTypes'
import { DISCIPLINES } from 'weplay-competitive/config/disciplines'
import { matchesSelectors } from 'weplay-competitive/reduxs/matches'

const mapPropsToMatchId = R.prop('matchId')
const mapPropsToLobbyId = R.prop('lobbyId')

const container = compose(
  withLocale,
  connect(createStructuredSelector({
    // selectors
    currentMember: currentMemberSelector,
    match: matchesSelectors.createRecordByIdSelector(mapPropsToMatchId),
    lobby: lobbiesSelectors.createRecordByIdSelector(mapPropsToLobbyId),
    allTournamentMembers: tournamentMembersSelectors.allRecordsSelector,
    getTournamentById: tournamentsSelectors.getRecordByIdSelector,
    isHomeParticipantActive: createParticipantActiveSelector(mapPropsToMatchId, MATCH_MEMBER_PARTICIPATION_TYPES.HOME),
    isAwayParticipantActive: createParticipantActiveSelector(mapPropsToMatchId, MATCH_MEMBER_PARTICIPATION_TYPES.AWAY),
    countHomeOnlineParticipants: countOnlineParticipantsSelector(
      mapPropsToMatchId,
      MATCH_MEMBER_PARTICIPATION_TYPES.HOME,
    ),
    countAwayOnlineParticipants: countOnlineParticipantsSelector(
      mapPropsToMatchId,
      MATCH_MEMBER_PARTICIPATION_TYPES.AWAY,
    ),
    currentLanguage: currentLanguageSelector,
  }), {
    // actionCreators
    fetchTournament: tournamentsActions.findRecord.request,
  }),
  withPropsOnChange([
    'match',
  ], ({
    match,
  }) => ({
    tournamentId: match.relationships.tournament.id,
  })),

  withPropsOnChange([
    'discipline',
  ], ({
    discipline,
  }) => ({
    backgroundSrc: DISCIPLINES[discipline].backgrounds.matchHeaderBackground,
  })),

  withPropsOnChange([
    'allTournamentMembers',
    'homeTournamentMemberIds',
    'awayTournamentMemberIds',
  ], ({
    allTournamentMembers,
    homeTournamentMemberIds,
    awayTournamentMemberIds,
  }) => {
    const homeTournamentMembers = allTournamentMembers.filter(
      tournamentMember => homeTournamentMemberIds.includes(tournamentMember.id),
    )
    const awayTournamentMembers = allTournamentMembers.filter(
      tournamentMember => awayTournamentMemberIds.includes(tournamentMember.id),
    )
    const tournamentMembers = homeTournamentMembers.concat(awayTournamentMembers)
    return ({
      tournamentMembers,
      firstHomeTournamentMemberId: R.pathOr(NaN, [
        '0',
        'id',
      ])(homeTournamentMembers),

      firstAwayTournamentMemberId: R.pathOr(NaN, [
        '0',
        'id',
      ])(awayTournamentMembers),
    })
  }),
  withPropsOnChange([
    'currentMember',
    'tournamentMembers',
    'getTournamentById',
    'tournamentId',
  ], ({
    currentMember,
    tournamentMembers,
    getTournamentById,
    tournamentId,
  }) => {
    const tournament = getTournamentById(tournamentId)
    return ({
      tournament,
      // TODO: @ILLIA this may also live in selectors?
      // maybe we should need much more selectors?
      isCurrentMemberInMatch: R.pipe(
        R.pathOr([], ['relationships', 'tournamentMembers']),
        R.map(R.prop('id')),
        R.intersection(tournamentMembers.map(R.prop('id'))),
        R.complement(R.isEmpty),
      )(currentMember),
      isCurrentMemberTournamentSpectator: R.ifElse(
        R.prop('isFetched'),
        R.pipe(
          R.path(['relationships', 'spectators']),
          R.map(R.prop('id')),
          R.contains(currentMember.id),
        ),
        R.always(false),
      )(tournament),
    })
  }),
  withMoment,
  withPropsOnChange([
    'lobby',
    'match',
    'moment',
  ], ({
    lobby,
    match,
    moment,
  }) => {
    const votingStartDatetime = moment(lobby.startDatetime).add(
      lobby.duration,
      's',
    )
    return ({
      isCountDownShown: match.status === MATCH_STATUSES.UPCOMING && moment().isBetween(
        moment(lobby.startDatetime),
        votingStartDatetime,
      ),
      votingStartDatetime,
    })
  }),
  withPropsOnChange([
    'tournament',
    'match',
    'discipline',
  ], ({
    t,
    tournament,
    match,
    discipline,
  }) => ({
    matchBreadcrumbs: tournament.isFetched
      ? [
        {
          name: 'WePlay!',
          path: pathWithParamsByRoute(NAMES.MEDIA),
        },
        {
          name: tournament.name,
          path: pathWithParamsByRoute(
            NAMES.TOURNAMENT,
            {
              tournamentId: tournament.id,
              tournamentName: transliterate(tournament.name),
              discipline,
            },
          ),
        },
        {
          name: `${capitalizeFirstLetter(t('competitive.match.breadcrumbs.match'))}  ${match.id}`,
          path: pathWithParamsByRoute(
            NAMES.MATCH,
            {
              tournamentId: tournament.id,
              tournamentName: transliterate(tournament.name),
              matchId: match.id,
              discipline,
            },
          ),
        },
      ]
      : [],
  })),
  withPropsOnChange([
    'isCurrentMemberInMatch',
    'match',
    'isCurrentMemberTournamentSpectator',
  ], ({
    isCurrentMemberInMatch,
    match,
    isCurrentMemberTournamentSpectator,
  }) => ({
    isDiscordLinkShown: isCurrentMemberInMatch
        && match.status !== MATCH_STATUSES.CANCELED
        && match.status !== MATCH_STATUSES.FINISHED,
    isSpectatorLinkShown: Boolean(isCurrentMemberTournamentSpectator && match.matchLink),
    showMatchLink: match.status === MATCH_STATUSES.ONGOING
      && (isCurrentMemberInMatch || isCurrentMemberTournamentSpectator),
  })),
  withHandlers({
    scrollToScoreBox: () => el => el.scrollIntoView({ behavior: 'smooth', block: 'start' }),
  }),

  lifecycle({
    componentDidUpdate(prevProps) {
      const {
        currentLanguage,
        fetchTournament,
        tournamentId,
      } = this.props
      if (prevProps.currentLanguage !== currentLanguage) {
        fetchTournament({ id: tournamentId })
          .catch(err => console.error(err))
      }
    },
  }),
)

export default container
