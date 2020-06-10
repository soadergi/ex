/* eslint-disable max-lines */
import * as R from 'ramda'
import queryString from 'query-string'
import {
  compose,
  lifecycle,
  withHandlers,
  withProps,
  withPropsOnChange,
  withState,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import withMoment from 'weplay-core/HOCs/withMoment'
import { goTo, NAMES } from 'weplay-core/routes'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import { openLoginModal } from 'weplay-core/reduxs/_legacy/modals/actions'

import withPreloader from 'weplay-components/withPreloader'

import { tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'
import { tournamentMemberInvitationsActions } from 'weplay-competitive/reduxs/tournamentMemberInvitations'
import { tournamentMembersActions } from 'weplay-competitive/reduxs/tournamentMembers'
import {
  currentMemberSelector,
  isPremiumAccountSelector,
} from 'weplay-competitive/reduxs/members/selectors'
import { createCurrentStagesSelectors } from 'weplay-competitive/reduxs/commonSelectors/stages'
import { createTournamentNodesSelector } from 'weplay-competitive/reduxs/commonSelectors/tournaments'
import { createTournamentParticipantsSelector } from 'weplay-competitive/reduxs/commonSelectors/tournamentMembers'
import { createTournamentGameSelector } from 'weplay-competitive/reduxs/commonSelectors/games'
import { validateAccessByLinkToken } from 'weplay-competitive/reduxs/tournaments/requests'
import { TOURNAMENT_STATUSES } from 'weplay-competitive/constants/tournamentStatuses'
import { TOURNAMENT_MEMBER_INVITATION_STATUS } from 'weplay-competitive/constants/tournamentMemberInvitationStatuses'
import withHotjar from 'weplay-competitive/HOCs/hotjar/withHotjar'
import { DISCIPLINES } from 'weplay-competitive/config/disciplines'
import { ACCESS_TYPES } from 'weplay-competitive/constants/accessTypes'
import { REWARD_TYPES } from 'weplay-competitive/constants/rewardTypes'
import withDisciplineAccessPage from 'weplay-competitive/HOCs/withDisciplineAccessPage'
import { queryTournamentAllInfo } from 'weplay-competitive/pages/TournamentPage/actionChains'
import { rewardsSelectors } from 'weplay-competitive/reduxs/rewards'
import { sponsorsSelectors } from 'weplay-competitive/reduxs/sponsors'
import { STATUS_CODES } from 'weplay-competitive/constants/statusCodes'
import { ERROR_CODES } from 'weplay-competitive/constants/errorCodes'

const mapPropsToTournamentId = R.pipe(
  R.path([
    'match', 'params', 'tournamentId',
  ]),
  Number,
)

const container = compose(
  withLocale,
  connect(createStructuredSelector({
    currentMember: currentMemberSelector,
    currentTournament: tournamentsSelectors.createRecordByIdSelector(mapPropsToTournamentId),
    tournamentNodes: createTournamentNodesSelector(mapPropsToTournamentId),
    tournamentParticipants: createTournamentParticipantsSelector(mapPropsToTournamentId),
    currentStagesSelectors: createCurrentStagesSelectors(mapPropsToTournamentId),
    currentGame: createTournamentGameSelector(mapPropsToTournamentId),
    rewards: rewardsSelectors.allRecordsSelector,
    sponsors: sponsorsSelectors.allRecordsSelector,
    isPremiumAccount: isPremiumAccountSelector,
  }), {
    // actionCreators
    queryTournamentAllInfo,
    queryTournamentMemberInvitations: tournamentMemberInvitationsActions.queryRecords.request,
    checkAccessTournament: tournamentMembersActions.findRecord.request,
    openLoginModal,
  }),
  withPageViewAnalytics(),
  withState(
    'isCurrentMemberHasAccessToTournament',
    'setIsCurrentMemberHasAccessToTournament',
    false,
  ),
  withState(
    'isFetchedTournamentInfo',
    'setIsFetchedTournamentInfo',
    false,
  ),

  withPropsOnChange([
    'currentTournament',
  ], ({
    currentTournament,
  }) => ({
    gameId: R.pathOr(NaN, ['relationships', 'game', 'id'])(currentTournament),
    rewardMapId: R.pathOr(NaN, ['relationships', 'rewardMap', 'id'])(currentTournament),
  })),

  withPropsOnChange([
    'rewards',
    'rewardMapId',
  ], ({
    rewards,
    rewardMapId,
  }) => R.pipe(
    R.filter(
      item => R.pipe(
        R.path(['relationships', 'rewardMap']),
        R.find(
          R.propEq('id', rewardMapId),
        ),
        array => !R.isEmpty(array),
      )(item),
    ),
    items => ({
      totalRewards: R.filter(
        R.propEq('rewardType', REWARD_TYPES.TOTAL),
      )(items),
      distributedRewards: R.filter(
        R.propEq('rewardType', REWARD_TYPES.DISTRIBUTED),
      )(items),
    }),
  )(rewards)),

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

  withDisciplineAccessPage,

  withProps(({ currentTournament, discipline }) => ({
    seoParams: {
      tournamentName: R.pathOr('', ['name'], currentTournament),
      discipline: DISCIPLINES[discipline].name,
    },
  })),

  withMoment,
  withPropsOnChange([
    'currentTournament',
    'currentStagesSelectors',
    'moment',
  ], ({
    currentTournament,
    currentStagesSelectors,
    moment,
  }) => ({
    showBracket: !!currentStagesSelectors.length
              && moment().isAfter(currentTournament.closeRegistrationDatetime)
              && (!!currentTournament.autoStart || currentTournament.status !== TOURNAMENT_STATUSES.UPCOMING),
  })),

  withHotjar,
  withHandlers({
    removeQueryParam: ({
      location,
      history,
    }) => (paramName) => {
      const query = queryString.parse(location.search)
      if (query[paramName]) {
        delete query[paramName]
      }
      history.push({
        search: queryString.stringify(query),
      })
    },
  }),
  withHandlers({
    fetchTournamentInfo: props => () => {
      const tournamentId = props.match.params.tournamentId
      props.setIsFetchedTournamentInfo(false)
      props.queryTournamentAllInfo(tournamentId)
        .then(() => props.setIsFetchedTournamentInfo(true))
        .catch((error) => {
          if (R.pathEq(['error', 'status'], STATUS_CODES.FORBIDDEN)(error)
            && R.pathEq(['error', 'code'], ERROR_CODES.CONTINUE)(error)) {
            // This case for Enestech:
            // 1) tournament is private for PC club
            // 2) user open this tournament from this PC club
            // 3) user is not logged in our platform
            props.openLoginModal()
          } else if (R.pathEq(['error', 'status'], STATUS_CODES.NOT_FOUND)(error)
            || R.pathEq(['error', 'status'], STATUS_CODES.FORBIDDEN)(error)) {
            props.history.replace(`/${NAMES.NOT_FOUND}`)
          } else {
            console.warn('error', error)
          }
        })
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.fetchTournamentInfo()
    },
    componentDidUpdate(prevProps) {
      const {
        currentTournament,
        locale,
        currentMember,
        history,
        location,
        match,
        disciplineFromResponse,
        discipline,
        setIsCurrentMemberHasAccessToTournament,
        queryTournamentMemberInvitations,
        isPremiumAccount,
        removeQueryParam,
      } = this.props
      const tournamentId = match.params.tournamentId
      const { token } = queryString.parse(location.search)
      if (prevProps.match.params.tournamentId !== tournamentId
        || prevProps.currentMember.isFetched !== currentMember.isFetched
        || locale !== prevProps.locale) {
        this.props.fetchTournamentInfo()
      }
      if (disciplineFromResponse && discipline
        && disciplineFromResponse !== discipline) {
        goTo({
          history,
          name: NAMES.NOT_FOUND,
          method: 'replace',
        })
      }

      if (prevProps.currentTournament !== currentTournament) {
        setIsCurrentMemberHasAccessToTournament(false)

        switch (currentTournament.accessType) {
          case ACCESS_TYPES.ACCESS_PUBLIC:
            setIsCurrentMemberHasAccessToTournament(true)
            break
          case ACCESS_TYPES.ACCESS_BY_PREMIUM:
            if (isPremiumAccount && R.pathOr(NaN, ['user', 'expiredPremiumAccountDate'], currentMember) > currentTournament.startDatetime) { //eslint-disable-line
              setIsCurrentMemberHasAccessToTournament(true)
              break
            }
            setIsCurrentMemberHasAccessToTournament(false)
            break
          case ACCESS_TYPES.ACCESS_BY_NAME:
            if (!currentMember.isFetched) {
              setIsCurrentMemberHasAccessToTournament(false)
              return
            }
            queryTournamentMemberInvitations({
              'filter[member]': currentMember.id,
              'filter[tournament]': currentTournament.id,
            })
              .then((response) => {
                if (
                  R.find(R.pathEq(['attributes', 'status'], TOURNAMENT_MEMBER_INVITATION_STATUS.ACTIVE))(response.data)
                ) {
                  setIsCurrentMemberHasAccessToTournament(true)
                } else {
                  setIsCurrentMemberHasAccessToTournament(false)
                }
              })
            break
          case ACCESS_TYPES.ACCESS_BY_LINK:
            if (token) {
              removeQueryParam('token')
              validateAccessByLinkToken(token, currentTournament.id)
                .then((isValid) => {
                  if (isValid) {
                    setIsCurrentMemberHasAccessToTournament(true)
                  }
                })
            }
            break
          default:
            break
        }
      }
    },
  }),

  withPreloader({
    mapPropsToIsLoading: R.pipe(
      R.path(['currentTournament', 'isFetched']),
      isFetched => !isFetched,
    ),
    isFullScreen: true,
  }),

  withPropsOnChange([
    'sponsors',
    'currentTournament',
    'discipline',
    'totalRewards',
  ], ({
    sponsors,
    currentTournament,
    discipline,
    totalRewards,
  }) => ({
    scrollSpySections: [
      {
        name: 'rewards',
        href: 'rewards',
        rendered: (totalRewards && !!totalRewards.length),
      },
      {
        name: 'aboutTournament',
        href: 'about',
        rendered: true,
      },
      {
        name: 'sponsors',
        href: 'sponsors',
        rendered: !R.isEmpty(sponsors),
      },
      {
        name: discipline === 'cs-go' ? 'mapPool' : 'heroPool',
        href: 'pool',
        rendered: true,
      },
      {
        name: 'description',
        href: 'description',
        rendered: !!currentTournament.description,
      },
      {
        name: 'participants',
        href: 'participants',
        rendered: true,
      },
    ],
  })),
)

export default container
