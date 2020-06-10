import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import CurrentTournamentIdProvider from '../EventPage/CurrentTournamentIdProvider'

import usePredictionTournamentId from './hooks/usePredictionTournamentId'
import PredictionMainSection from './components/PredictionMainSection/PredictionMainSection'

function PredictionsPage({ match }) {
  const tournamentSlug = useMemo(
    () => match.params.tournamentSlug,
    [match],
  )

  const tournamentId = usePredictionTournamentId({ tournamentSlug })

  return (
    <CurrentTournamentIdProvider tournamentId={tournamentId}>
      <PredictionMainSection />
    </CurrentTournamentIdProvider>
  )
}

PredictionsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      tournamentSlug: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isExact: PropTypes.bool.isRequired,
  }).isRequired,
}

export default withRouter(PredictionsPage)
