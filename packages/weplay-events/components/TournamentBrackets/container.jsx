import * as R from 'ramda'
import {
  compose,
  withProps,
  withStateHandlers,
  lifecycle,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { tournamentGroupsWithParticipantSelector } from 'weplay-events/reduxs/tournaments/reducer'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'

const container = compose(
  withRouteInfo,
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    groups: tournamentGroupsWithParticipantSelector,
  }), {
  }),

  withProps(({
    routeInfo,
  }) => ({
    pageName: R.path(['name'], routeInfo),
    // analytic
    contentType: 'Tournament Bracket',
    contentAction: 'Show rules',
  })),

  withStateHandlers(({
    tableTabs,
    isTournamentFinished,
  }) => ({
    activeTab: tableTabs[isTournamentFinished ? tableTabs.length - 1 : 0],
  }), {
    setActiveTab: () => activeTab => ({
      activeTab,
    }),
  }),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (prevProps.isTournamentFinished !== this.props.isTournamentFinished) {
        const { tableTabs } = this.props

        this.props.setActiveTab(
          tableTabs[this.props.isTournamentFinished ? tableTabs.length - 1 : 0],
        )
      }
    },
  }),
)

export default container
