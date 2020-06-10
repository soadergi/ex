import React from 'react'
import PropTypes from 'prop-types'
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'

import { NAMES, pathForRoute } from 'weplay-core/routes'

import EventsSubMenuPortal from 'weplay-events/components/EventsSubMenuPortal'

import ReshuffleMadness2018Page from './ReshuffleMadness2018Page/loadable'
import ArtifactPage from './ArtifactPage/loadable'
import WinterMadnessPage from './WinterMadnessPage/loadable'
import LockAndLoadPage from './LockAndLoadPage/loadable'
import TugOfWarPage from './TugOfWarPage/loadable'
import EventsRootPage from './EventsRootPage'
import EventPage from './EventPage/EventPage'
import DotaUnderlordsPage from './DotaUnderlordsPage/loadable'
import MadMoonComicsPage from './MadMoonComicsPage/loadable'

const PES_TOURNAMENTS = [
  'weplay-bukovel-minor-2020',
  'tug-of-war-mad-moon',
  'reshuffle-madness-2019',
  'we-save-charity-play',
  'valentine-madness',
  'we-play-pushka-league',
  'we-play-clutch-island',
  'forge-of-masters/spring-2019-lan-final',
  'forge-of-masters/autumn-2019-lan-final',
]

const pesTournamentSlugs = PES_TOURNAMENTS.join('|')

const EventsPackage = ({
  match: { path, params: { lang2 } },
}) => (
  <>
    <EventsSubMenuPortal />

    <Switch>
      <Redirect
        exact
        from="/:lang(en|ru)?/events/cs-go/forge-of-masters/spring-2019-group-stage"
        to={`${lang2 ? `/${lang2}` : ''}/events/cs-go/forge-of-masters/spring-2019-lan-final`}
      />

      <Redirect
        exact
        from="/:lang(en|ru)?/events/cs-go/forge-of-masters/autumn-2019-online-stage"
        to={`${lang2 ? `/${lang2}` : ''}/events/cs-go/forge-of-masters/autumn-2019-lan-final`}
      />

      <Route
        exact
        path={`${path}/${pathForRoute(NAMES.EVENTS_ROOT)}`}
        component={EventsRootPage}
      />
      <Route
        path={`${path}/${pathForRoute(NAMES.EVENT_PAGE)}(${pesTournamentSlugs})`}
        component={EventPage}
      />
      <Route
        exact
        path={`${path}/${pathForRoute(NAMES.MAD_MOON_COMICS)}`}
        component={MadMoonComicsPage}
      />
      <Route
        exact
        path={`${path}/${pathForRoute(NAMES.RESHUFFLE_MADNESS_2018)}`}
        component={ReshuffleMadness2018Page}
      />
      <Route
        exact
        path={`${path}/${pathForRoute(NAMES.ARTIFACT)}`}
        component={ArtifactPage}
      />
      <Route
        exact
        path={`${path}/${pathForRoute(NAMES.WINTER_MADNESS)}`}
        component={WinterMadnessPage}
      />
      <Route
        exact
        path={`${path}/${pathForRoute(NAMES.LOCK_AND_LOAD)}`}
        component={LockAndLoadPage}
      />
      <Route
        exact
        path={`${path}/${pathForRoute(NAMES.TUG_OF_WAR)}`}
        component={TugOfWarPage}
      />
      <Route
        path={`${path}/${pathForRoute(NAMES.DOTA_UNDERLORDS)}`}
        component={DotaUnderlordsPage}
      />
      <Redirect to={`/${pathForRoute(NAMES.NOT_FOUND)}`} />
    </Switch>
  </>
)

EventsPackage.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      lang2: PropTypes.string,
    }).isRequired,
  }).isRequired,
}

export default EventsPackage
