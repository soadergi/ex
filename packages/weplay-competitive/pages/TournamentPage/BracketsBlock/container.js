import * as R from 'ramda'
import {
  compose,
  lifecycle,
  withHandlers,
  withState,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

import { matchesActions } from 'weplay-competitive/reduxs/matches'
import {
  createIsTournamentFinishedSelector,
  createTournamentBracketTypeSelector,
} from 'weplay-competitive/reduxs/tournaments/selectors'
import { createTournamentNodesSelector } from 'weplay-competitive/reduxs/commonSelectors/tournaments'
import { createTournamentStageIdsSelector } from 'weplay-competitive/reduxs/commonSelectors/stages'
import { MATCH_STATUSES } from 'weplay-competitive/constants/matchStatuses'

import {
  enterFullScreen,
  exitFullScreen,
  isFullScreenElement,
  addFullScreenChangeListeners,
  removeFullScreenChangeListeners,
} from './helpers/fullScreen'

const mapPropsToTournamentId = R.pipe(
  R.path([
    'match', 'params', 'tournamentId',
  ]),
  Number,
)

const container = compose(
  withRouter,
  connect(createStructuredSelector({
    // selectors
    tournamentNodes: createTournamentNodesSelector(mapPropsToTournamentId),
    isTournamentFinished: createIsTournamentFinishedSelector(mapPropsToTournamentId),
    tournamentStageIds: createTournamentStageIdsSelector(mapPropsToTournamentId),
    tournamentBracketType: createTournamentBracketTypeSelector(mapPropsToTournamentId),
    globalScope: globalScopeSelector,
  }), {
    // actionCreators
    queryMatches: matchesActions.queryRecords.request,
  }),

  withHandlers({
    getMatches: props => () => props.queryMatches({
      included: 'player1,player2,node,members,lobby',
      'filter[node.stage]': props.tournamentStageIds.join(','),
      'page[limit]': 300,
    }),
  }),

  withState('isCollapsed', 'toggleCollapse', false),

  withStateHandlers({
    bracketsRef: null,
  }, {
    createBracketsRef: () => el => ({ bracketsRef: el }),
  }),

  withHandlers({
    scrollToBrackets: ({
      globalScope,
      bracketsRef,
    }) => () => {
      globalScope.scrollTo(0, bracketsRef.offsetTop)
    },
  }),

  withHandlers({
    handleToggleCollapse: ({
      toggleCollapse,
      isCollapsed,
    }) => () => {
      toggleCollapse(!isCollapsed)
    },
  }),

  withStateHandlers({
    isFullScreen: false,
  }, {
    handleFullScreenChange: (state, props) => () => {
      props.scrollToBrackets()
      return {
        isFullScreen: isFullScreenElement(props.globalScope.document),
      }
    },
  }),

  withHandlers({
    handleButtonClick: ({
      globalScope,
      isFullScreen,
      bracketsRef,
    }) => () => {
      if (isFullScreen) {
        exitFullScreen(globalScope.document)
      } else {
        enterFullScreen(bracketsRef)
      }
    },
  }),

  withHandlers(() => {
    let header
    return {
      createHeaderRef: () => (el) => { header = el },
      handleHeaderPosition: () => (left) => {
        header.scrollLeft = left
      },
    }
  }),

  withHandlers({
    getRoundStatus: ({
      isTournamentFinished,
    }) => (round) => {
      if (!round) return ''
      if (isTournamentFinished) {
        return MATCH_STATUSES.FINISHED
      }
      const isOngoing = R.pipe(
        R.filter(
          R.propEq('status', MATCH_STATUSES.ONGOING),
        ),
        R.isEmpty,
        R.not,
      )(round.games)
      if (isOngoing) {
        return MATCH_STATUSES.ONGOING
      }
      const isFinished = R.pipe(
        R.filter(
          R.anyPass([
            R.propEq('status', MATCH_STATUSES.CANCELED),
            R.propEq('status', MATCH_STATUSES.FINISHED),
          ]),
        ),
        R.isEmpty,
        R.not,
      )(round.games)
      if (isFinished) {
        return MATCH_STATUSES.FINISHED
      }
      return MATCH_STATUSES.UPCOMING
    },
  }),

  lifecycle({
    componentDidMount() {
      const { getMatches, globalScope: { document }, handleFullScreenChange } = this.props
      getMatches()
      addFullScreenChangeListeners(document, handleFullScreenChange)
    },
    componentWillUnmount() {
      const { handleFullScreenChange, globalScope: { document } } = this.props
      removeFullScreenChangeListeners(document, handleFullScreenChange)
    },
  }),
)

export default container
