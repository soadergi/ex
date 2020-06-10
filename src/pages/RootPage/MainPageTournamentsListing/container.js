import * as R from 'ramda'
import {
  compose,
  lifecycle,
  withHandlers,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { currentLanguageSelector, i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { tournamentsActions, tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'
import { gamesActions } from 'weplay-competitive/reduxs/games'
import { TOURNAMENT_STATUSES } from 'weplay-competitive/constants/tournamentStatuses'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    currentLanguage: currentLanguageSelector,
    getTournamentById: tournamentsSelectors.getRecordByIdSelector,
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
    queryTournaments: tournamentsActions.queryRecords.request,
    queryGames: gamesActions.queryRecords.request,
  }),
  withStateHandlers({
    fetchedRecords: [],
  }, {
    updateFetchedData: (state, props) => recordIds => ({
      fetchedRecords: R.pipe(
        R.map(props.getTournamentById),
      )(recordIds),
    }),
  }),
  withHandlers({
    getTournamentsList: props => () => {
      props.queryTournaments({
        included: 'organizer,game_mode',
        'filter[featured]': 1,
        'filter[status]': `${TOURNAMENT_STATUSES.UPCOMING}, ${TOURNAMENT_STATUSES.ONGOING}`,
        'page[limit]': props.amount,
        'page[offset]': 0,
        sort: 'start_datetime',
      }).then((response) => {
        props.updateFetchedData(response.data.map(R.prop('id')))
      })
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.getTournamentsList()
      // TODO: Tetiana think about next request
      this.props.queryGames({
        included: 'game_modes',
      })
    },

    componentDidUpdate(prevProps) {
      if (this.props.currentLanguage !== prevProps.currentLanguage) {
        this.props.getTournamentsList()
      }
    },
  }),
)

export default container
