import routeConfig from '../routeConfig'

import { modifyRouteConfigByTournamentStatus, modifyRouteConfigByTournamentSlug } from './routeConfigModifiers'

function getEventPageNavigationRoutesConfig({ tournamentSlug, tournamentStatus }) {
  return routeConfig
      |> modifyRouteConfigByTournamentSlug(tournamentSlug)
      |> modifyRouteConfigByTournamentStatus(tournamentStatus)
}

export default getEventPageNavigationRoutesConfig
