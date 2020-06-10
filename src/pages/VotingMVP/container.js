import queryString from 'query-string'
import * as R from 'ramda'
import {
  compose,
  lifecycle,
  withHandlers,
  withProps,
  withPropsOnChange,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import withMoment from 'weplay-core/HOCs/withMoment'
import {
  votingOptionsByIdSelector,
} from 'weplay-core/reduxs/votingOptions/reducer'
import { readVotingOptions } from 'weplay-core/reduxs/votingOptions/actions'
import { readVoting } from 'reduxs/votings/actions'
import { votingByIdSelector } from 'reduxs/votings/reducer'
import backgroundUrl from 'weplay-events/pages/TugOfWarPage/img/main-bg.jpg'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import { isStrictlyTabletWidthLegacySelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import {
  i18nTextsSelector,
  currentLanguageSelector,
} from 'weplay-core/reduxs/language/reducer'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { openLoginModal, triggerSignUpModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import {
  originSelector,
} from 'weplay-core/reduxs/common/selectors'
import { getVotingStatsRequest } from 'weplay-events/reduxs/gameStats/request'
import withPreloader from 'weplay-components/withPreloader'
import { TUG_OF_WAR_TOURNAMENT_IDS } from 'weplay-events/pages/TugOfWarPage/consts'

import ogImageRu from './img/mvp_ru.jpg'
import ogImageEn from './img/mvp_en.jpg'
import {
  SORT_OPTIONS,
  votingIds,
  COLLAPSED_CANDIDATES_AMOUNT,
  VOTING_SIDE,
  CANDIDATE_ID,
} from './constants'

const hasCandidateName = (candidate, inputValue, teamName) => {
  if (!R.contains(teamName, R.path(['extra', 'teamName'], candidate))) {
    return false
  }

  const concatenatedString = candidate.extra.nickname + candidate.extra.fullName + candidate.extra.teamName
  const trimmedInput = inputValue.trim().toLowerCase()

  return concatenatedString.toLowerCase().includes(trimmedInput)
}

const filterCandidates = (candidates, inputValue, teamName) => R.filter(
  candidate => hasCandidateName(candidate, inputValue, teamName),
  candidates,
)

const sortCandidates = (candidates, sortType = SORT_OPTIONS.TEAM_NAME, isReversed) => {
  const sortedCandidates = R.sortBy(R.compose(R.toLower, R.path(['extra', sortType])))(candidates)

  return isReversed ? R.reverse(sortedCandidates) : sortedCandidates
}

const container = compose(
  withRouteInfo,
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    americasVoting: votingByIdSelector(() => votingIds.americas),
    asiaVoting: votingByIdSelector(() => votingIds.asia),
    americasCandidates: votingOptionsByIdSelector(votingIds.americas),
    asiaCandidates: votingOptionsByIdSelector(votingIds.asia),
    currentLanguage: currentLanguageSelector,
    isLoggedIn: isLoggedInSelector,
    origin: originSelector,
    isStrictlyTabletWidth: isStrictlyTabletWidthLegacySelector,
  }), {
    // actionCreators
    readVotingOptionsRequest: readVotingOptions.request,
    readVotingRequest: readVoting.request,
    openLoginModal,
    triggerSignUpModal,
  }),

  withProps(({
    origin,
    match,
  }) => ({
    copyLink: `${origin}${match.url}`,
  })),

  withPropsOnChange([
    'i18nTexts',
    'currentLanguage',
    'routeInfo',
  ], ({
    i18nTexts,
    currentLanguage,
    routeInfo,
  }) => ({
    tabs: [
      {
        id: 'americas',
        title: i18nTexts.votingMVP.americas,
      },
      {
        id: 'asia',
        title: i18nTexts.votingMVP.asia,
      },
    ],
    backgroundUrls: backgroundUrl,
    ogImage: currentLanguage === 'en' ? ogImageEn : ogImageRu,
    tournamentTitle: R.prop('title', routeInfo),
  })),
  withPropsOnChange([
    'location',
    'tabs',
  ], ({
    location,
    tabs,
  }) => {
    const activeTabId = queryString.parse(location.search)[VOTING_SIDE]
    const activeTab = R.pipe(
      R.find(R.propEq('id', activeTabId)),
      R.defaultTo(tabs[0]),
    )(tabs)
    return ({
      activeTab,
    })
  }),

  withHandlers({
    setActiveTab: ({ history }) => (activeTab) => {
      history.replace({
        ...history.location,
        search: `${VOTING_SIDE}=${activeTab.id}`,
      })
    },
  }),
  withStateHandlers({
    candidatesStats: {},
  }, {
    setCandidatesStats: () => candidatesStats => ({ candidatesStats }),
  }),

  withPropsOnChange([
    'activeTab',
    'americasCandidates',
    'asiaCandidates',
  ], ({
    activeTab,
    americasCandidates,
    asiaCandidates,
  }) => {
    switch (activeTab.id) {
      case 'americas':
        return ({
          candidates: americasCandidates,
          activeVotingId: votingIds.americas,
        })
      case 'asia':
        return ({
          candidates: asiaCandidates,
          activeVotingId: votingIds.asia,
        })
      default:
        return ({
          candidates: [],
          activeVotingId: votingIds.americas,
        })
    }
  }),

  withStateHandlers({
    isCollapsed: true,
  }, {
    toggleCollapsed: () => () => ({
      isCollapsed: false,
    }),
  }),

  withPropsOnChange([
    'candidates',
  ], ({
    candidates,
  }) => ({
    teams: R.pipe(
      R.map(R.path(['extra', 'teamName'])),
      R.uniq,
    )(candidates),
  })),

  withMoment,
  withPropsOnChange([
    'asiaVoting',
    'americasVoting',
    'moment',
  ], ({
    asiaVoting,
    americasVoting,
    moment,
  }) => ({
    isVotingFinished: moment().isAfter(asiaVoting.finishDatetime)
      && moment().isAfter(americasVoting.finishDatetime),
    // the same as americasVoting.startDatetime be definition
    votingStartDatetime: asiaVoting.startDatetime,
  })),

  withPropsOnChange([
    'teams',
  ], ({
    teams,
    i18nTexts,
  }) => {
    const makeTeamOption = team => ({
      label: team,
      value: team,
    })

    const teamsOptions = R.map(makeTeamOption, teams)
    const emptyTeamOption = {
      label: i18nTexts.votingMVP.filters.chooseTeam,
      value: '',
    }

    return {
      chooseByDropdownOptions: [emptyTeamOption, ...teamsOptions],
      sortByDropdownOptions: [
        {
          label: i18nTexts.votingMVP.filters.sortBy.teamName,
          value: SORT_OPTIONS.TEAM_NAME,
        },
        {
          label: i18nTexts.votingMVP.filters.sortBy.fullName,
          value: SORT_OPTIONS.FULL_NAME,
        },
        {
          label: i18nTexts.votingMVP.filters.sortBy.nickname,
          value: SORT_OPTIONS.NICKNAME,
        },
      ],
    }
  }),

  withStateHandlers({
    searchInputValue: '',
    sortType: SORT_OPTIONS.TEAM_NAME,
    teamName: '',
    isReversed: false,
  }, {
    setSearchInputValue: () => event => ({
      searchInputValue: event.target.value,
    }),
    setClearSearchInputValue: () => () => ({
      searchInputValue: '',
    }),
    setSortType: () => sortType => ({
      sortType,
    }),
    setTeamName: () => teamName => ({
      teamName,
    }),
    toggleReversed: ({ isReversed }) => () => ({
      isReversed: !isReversed,
    }),
  }),

  withPropsOnChange([
    'searchInputValue',
    'candidates',
    'sortType',
    'isCollapsed',
    'isReversed',
    'teamName',
    'isVotingFinished',
  ], ({
    searchInputValue,
    candidates,
    sortType,
    isCollapsed,
    isReversed,
    teamName,
    isVotingFinished,
  }) => {
    if (R.isEmpty(candidates)) {
      return {
        filteredCandidates: [],
        showMoreVisible: false,
      }
    }

    if (isVotingFinished) {
      return {
        filteredCandidates: R.pipe(
          // TODO: @Ivan try to use R.desc for sort here
          R.sortBy(R.prop('votesCount')),
          R.reverse,
          reversedCandidates => R.slice(0, COLLAPSED_CANDIDATES_AMOUNT, reversedCandidates),
        )(candidates),
        showMoreVisible: false,
      }
    }

    return {
      filteredCandidates: R.pipe(
        pipedCandidates => sortCandidates(pipedCandidates, sortType, isReversed),
        sortedCandidates => filterCandidates(sortedCandidates, searchInputValue, teamName),
        filteredCandidates => (isCollapsed && !searchInputValue && !teamName
          ? R.slice(0, COLLAPSED_CANDIDATES_AMOUNT, filteredCandidates)
          : filteredCandidates),
      )(candidates),
      showMoreVisible: isCollapsed && !searchInputValue && !teamName,
    }
  }),

  withPropsOnChange([
    'location',
  ], ({
    location,
  }) => ({
    activeCandidateId: Number(queryString.parse(location.search)[CANDIDATE_ID]),
  })),

  lifecycle({
    componentDidMount() {
      const {
        readVotingOptionsRequest,
        setCandidatesStats,
      } = this.props

      const params = {
        limit: 500,
      }

      readVotingOptionsRequest({ votingId: votingIds.americas, params })
      readVotingOptionsRequest({ votingId: votingIds.asia, params })

      getVotingStatsRequest(TUG_OF_WAR_TOURNAMENT_IDS.DIRE)
      // TODO: @Tony check check
        .then(candidatesStats => candidatesStats && setCandidatesStats(candidatesStats))
    },
    componentDidUpdate(prevProps) {
      const {
        activeTab,
        readVotingRequest,
        readVotingOptionsRequest,
        filteredCandidates,
        location,
        toggleCollapsed,
        isCollapsed,
        setTeamName,
        isLoggedIn,
      } = this.props

      if (prevProps.activeTab.id !== activeTab.id) {
        readVotingRequest({ votingId: votingIds[activeTab.id] })
        readVotingOptionsRequest({
          votingId: votingIds[activeTab.id],
          params: {
            limit: 500,
          },
        })
        setTeamName('')
      }

      if (prevProps.isLoggedIn !== isLoggedIn) {
        readVotingOptionsRequest({
          votingId: votingIds[activeTab.id],
          params: {
            limit: 500,
          },
        })
      }

      const activeCandidateId = Number(queryString.parse(location.search)[CANDIDATE_ID])
      if (activeCandidateId && filteredCandidates.length && isCollapsed) {
        const isActiveCandidateRendered = R.pipe(
          R.slice(0, COLLAPSED_CANDIDATES_AMOUNT),
          R.find(R.propEq('id', activeCandidateId)),
        )(filteredCandidates)
        if (!isActiveCandidateRendered) {
          toggleCollapsed()
        }
      }
    },
  }),
  withPreloader({
    mapPropsToIsLoading: ({
      candidates,
    }) => R.isEmpty(candidates),
    isFullScreen: true,
  }),
)

export default container
