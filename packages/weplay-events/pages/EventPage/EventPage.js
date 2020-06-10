import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'

import CurrentTournamentIdProvider from './CurrentTournamentIdProvider'
import EventsPageRefsProvider from './EventsPageRefsProvider'
import EventPageHelmet from './components/EventPageHelmet'
import EventHeroSection from './components/EventHeroSection/EventHeroSection'
import Navigation from './components/Navigation/Navigation'
import SubscriptionBannerBlock from './blocks/SubscriptionBannerBlock'
import PartnersBlock from './blocks/PartnersBlock'
import Disclaimer from './components/Disclaimer/Disclaimer'
import MatchDetailsProvider from './components/MatchDetails/MatchDetailsProvider'
import MatchDetails from './components/MatchDetails/MatchDetails'
import useEventPage from './useEventPage'
import getEventPageNavigationRoutesConfig from './helpers/getEventPageNavigationRoutesConfig'

const EventPage = ({ match, location }) => {
  const [matchId, setMatchId] = useState(null)

  const { tournamentId, status } = useEventPage({
    tournamentSlug: match.params.tournamentSlug,
    tournamentDiscipline: match.params.tournamentDiscipline,
  })

  const routesConfig = useMemo(() => getEventPageNavigationRoutesConfig({
    tournamentSlug: match.params.tournamentSlug,
    tournamentStatus: status,
  }), [match.params.tournamentSlug, status])

  return (
    <CurrentTournamentIdProvider tournamentId={tournamentId}>
      <EventsPageRefsProvider>
        <MatchDetailsProvider
          matchId={matchId}
          setMatchId={setMatchId}
        >
          <EventPageHelmet
            tournamentSlug={match.params.tournamentSlug}
            pathname={location.pathname}
          />

          <EventHeroSection />

          <Navigation routesConfig={routesConfig} />

          <Switch>
            {routesConfig.map(route => (route.disabled
              ? null
              : (
                <Route
                  exact
                  path={`${match.path}${route.url ? `/${route.url}` : ''}`}
                  component={route.component}
                />
              )))}
            <Redirect to={match.path} />
          </Switch>

          <div className="u-pb-8">
            <SubscriptionBannerBlock />
            <PartnersBlock />
            <Disclaimer />
          </div>

          <MatchDetails />
        </MatchDetailsProvider>
      </EventsPageRefsProvider>
    </CurrentTournamentIdProvider>
  )
}

EventPage.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      tournamentSlug: PropTypes.string,
      tournamentDiscipline: PropTypes.string,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default EventPage
