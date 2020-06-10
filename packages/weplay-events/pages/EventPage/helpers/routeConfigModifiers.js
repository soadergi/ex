import { TOURNAMENT_STATUSES } from 'weplay-events/pages/EventPage/constants'

export function modifyRouteConfigByTournamentSlug(tournamentSlug) {
  return (routeConfig) => {
    switch (tournamentSlug) {
      case 'we-play-pushka-league':
        return routeConfig.map((route) => {
          if (route.url === 'guess-winners' || route.url === 'mvp-voting') {
            return {
              ...route,
              disabled: false,
            }
          }
          return route
        })
      case 'tug-of-war-mad-moon':
        return routeConfig.map((route) => {
          if (route.url === 'mvp-voting') {
            return {
              ...route,
              disabled: false,
            }
          }
          return route
        })
      case 'we-play-clutch-island':
        return routeConfig.map((route) => {
          if (route.url === 'guess-winners' || route.url === 'mvp-voting') {
            return {
              ...route,
              disabled: false,
            }
          }
          return route
        })
      default:
        return routeConfig
    }
  }
}

export function modifyRouteConfigByTournamentStatus(tournamentStatus) {
  return (routeConfig) => {
    switch (tournamentStatus) {
      case TOURNAMENT_STATUSES.UPCOMING:
        return routeConfig.map((route) => {
          if (route.url === 'standings'
            || route.url === 'schedule'
            || route.url === 'watch-live'
            || route.url === 'guess-winners'
            || route.url === 'mvp-voting') {
            return {
              ...route,
              disabled: true,
            }
          }
          return route
        })
      case TOURNAMENT_STATUSES.ENDED:
        return routeConfig.map((route) => {
          if (route.url === 'watch-live') {
            return {
              ...route,
              disabled: true,
            }
          }
          return route
        })
      case TOURNAMENT_STATUSES.ONGOING:
      default:
        return routeConfig
    }
  }
}
