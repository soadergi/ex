import React from 'react'
import * as R from 'ramda'
import { createStructuredSelector } from 'reselect'
import queryString from 'query-string'
import {
  compose,
  lifecycle,
  withStateHandlers,
  withProps,
  withState,
  withHandlers,
  withPropsOnChange,
  branch,
  renderComponent,
} from 'recompose'
import { connect } from 'react-redux'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'

import { DISCIPLINES } from 'weplay-competitive/config/disciplines'
import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'
import { gamesActions } from 'weplay-competitive/reduxs/games'
import {
  tournamentsActions,
  tournamentsSelectors,
} from 'weplay-competitive/reduxs/tournaments'
import withDisciplineAccessPage from 'weplay-competitive/HOCs/withDisciplineAccessPage'
import withHotjar from 'weplay-competitive/HOCs/hotjar/withHotjar'
import { TOURNAMENT_STATUSES } from 'weplay-competitive/constants/tournamentStatuses'
import ChallongeDiscipline from 'weplay-competitive/components/ChallongeDiscipline/ChallongeDiscipline'

const FEATURED_TOURNAMENTS_NUMBER = 3

const container = compose(
  withLocale,
  withDisciplineAccessPage,
  branch(
    ({ tournamentDiscipline }) => Boolean(tournamentDiscipline?.challonge?.responseGameName),
    renderComponent(() => (
      <ChallongeDiscipline />
    )),
  ),
  connect(createStructuredSelector({
    // selectors
    getTournamentById: tournamentsSelectors.getRecordByIdSelector,
    getGameModeById: gameModesSelectors.getRecordByIdSelector,
    isLoggedIn: isLoggedInSelector,
  }), {
    // actionCreators
    queryTournaments: tournamentsActions.queryRecords.request,
    queryGame: gamesActions.findRecord.request,
  }),
  withPageViewAnalytics(),
  withState('activeGameModeFilter', 'setActiveGameModeFilter', {}),
  withState('gameModeIds', 'setGameModeIds', []),
  withProps({
    userPatch: {
      is_tournament_dota2_beta_player: true,
    },
  }),
  withPropsOnChange([
    'gameModeIds',
    'getGameModeById',
  ], ({
    gameModeIds,
    getGameModeById,
  }) => ({
    gameModes: R.pipe(
      R.map(getGameModeById),
    )(gameModeIds),
  })),
  withProps(({ activeGameModeFilter, discipline }) => ({
    seoParams: {
      discipline: DISCIPLINES[discipline].name,
      mode: activeGameModeFilter && activeGameModeFilter.isFetched ? activeGameModeFilter.title : '',
    },
  })),
  withProps(({ discipline }) => ({
    backgroundSrc: DISCIPLINES[discipline].backgrounds.mainTournamentsPage,
  })),
  withStateHandlers({
    fetchedRecords: [],
    isDataLoaded: false,
  }, {
    updateFetchedData: (state, props) => recordIds => ({
      fetchedRecords: R.pipe(
        R.map(props.getTournamentById),
      )(recordIds),
      isDataLoaded: true,
    }),
  }),
  withHandlers({
    updateActiveGameModeFilter: ({
      gameModes,
      location,
      setActiveGameModeFilter,
    }) => () => {
      const { gameMode } = queryString.parse(location.search)
      const activeGameMode = gameModes.find(gameModeTitle => gameModeTitle.id === Number(gameMode))
      setActiveGameModeFilter(activeGameMode || {})
    },
  }),
  withHotjar,
  withHandlers({
    updateQueryTournamentsAndGame: props => () => {
      props.queryTournaments({
        included: 'organizer,game_mode',
        'filter[featured]': 1,
        'filter[game_mode.game]': DISCIPLINES[props.discipline].id,
        'filter[status]': `${TOURNAMENT_STATUSES.UPCOMING}, ${TOURNAMENT_STATUSES.ONGOING}`,
        'page[limit]': FEATURED_TOURNAMENTS_NUMBER,
        'page[offset]': 0,
        sort: 'start_datetime',
      }).then((response) => {
        props.updateActiveGameModeFilter()
        props.updateFetchedData(response.data.map(R.prop('id')))
      })
      props.queryGame({
        id: DISCIPLINES[props.discipline].id,
        included: 'game_modes',
      }).then((response) => {
        props.setGameModeIds(response.data.relationships.gameModes.data.map(R.prop('id')))
      })
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.updateQueryTournamentsAndGame()
    },
    componentDidUpdate(prevProps) {
      if (this.props.locale !== prevProps.locale
          || this.props.discipline !== prevProps.discipline) {
        this.props.updateQueryTournamentsAndGame()
      }
      if (this.props.location.search !== prevProps.location.search
          || this.props.gameModes !== prevProps.gameModes) {
        this.props.updateActiveGameModeFilter()
      }
    },
  }),
)

export default container
