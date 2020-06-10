import * as R from 'ramda'
import {
  compose,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

import { createTournamentTeamsByEventNameSelector } from 'weplay-events/reduxs/tournaments/reducer'

const mapPropsToTournamentTitle = R.path(['routeInfo', 'title'])
const minParticipantsBlockAmount = 2
const extraSmallScreenWidth = 320

const container = compose(
  withRouteInfo,
  connect(createStructuredSelector({
    globalScope: globalScopeSelector,
    allTeams: createTournamentTeamsByEventNameSelector(mapPropsToTournamentTitle),
  }), {
    // actionCreators
  }),

  withHandlers({
    isCardExpanded: ({
      globalScope,
      allTeams,
      allCollapsed,
    }) => ({
      index,
      isFirstTeam,
      isTbd,
    }) => {
      const isFirstParticipantsBlock = index < Math.floor(allTeams.length / minParticipantsBlockAmount)
      const isExtraSmallScreenWidth = globalScope.innerWidth > extraSmallScreenWidth

      return allCollapsed
        ? false
        : isFirstParticipantsBlock && !isTbd && (isExtraSmallScreenWidth || isFirstTeam)
    },
  }),
)

export default container
