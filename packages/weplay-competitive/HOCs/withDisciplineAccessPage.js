import React from 'react'
import { Redirect } from 'react-router-dom'
import {
  branch,
  compose,
  lifecycle,
  renderComponent,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as R from 'ramda'

import { goTo, NAMES, pathForRoute } from 'weplay-core/routes'

import { DISCIPLINES, ACCESS_TYPES } from 'weplay-competitive/config/disciplines'
import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'
import { createIsPlayerHaveBetaAccess } from 'weplay-competitive/reduxs/commonSelectors/discipline'

const mapPropsToTournamentDiscipline = R.pipe(
  R.prop('discipline'),
  discipline => R.prop(discipline, DISCIPLINES),
)

const withDisciplineAccessPage = compose(
  withDiscipline,
  branch(
    ({ tournamentDiscipline }) => !tournamentDiscipline,
    renderComponent(() => (
      <Redirect to={`/${pathForRoute(NAMES.NOT_FOUND)}`} />
    )),
  ),
  connect(createStructuredSelector({
    isPlayerHaveBetaAccess: createIsPlayerHaveBetaAccess(mapPropsToTournamentDiscipline),
  }),
  {
    // actionCreators
  }),
  withPropsOnChange([
    'tournamentDiscipline',
    'isPlayerHaveBetaAccess',
  ], ({
    tournamentDiscipline,
    isPlayerHaveBetaAccess,
  }) => ({
    isDisabledForPlayer: tournamentDiscipline.access.type === ACCESS_TYPES.DISABLED
        || (tournamentDiscipline.access.type === ACCESS_TYPES.BETA && !isPlayerHaveBetaAccess),
  })),
  lifecycle({
    componentDidMount() {
      if (this.props.isDisabledForPlayer) {
        goTo({
          history: this.props.history,
          name: NAMES.NOT_FOUND,
          method: 'replace',
        })
      }
    },
  }),
)

export default withDisciplineAccessPage
