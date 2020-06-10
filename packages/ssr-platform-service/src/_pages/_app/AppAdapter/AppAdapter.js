import React from 'react'
import PropTypes from 'prop-types'
import { PROJECT_PREFIXS } from 'weplay-core/routes'
import App from 'weplay-platform/App/App'
import BaseLayout from 'weplay-platform/App/Main/BaseLayout/BaseLayout'
import TournamentsSubMenu from 'weplay-competitive/components/TournamentsSubMenu'
import useActiveTournament from 'weplay-events/hooks/useActiveTournament'

// TODO: rewrite tournaments custom submenu
const getCustomSubMenu = ({
  closeMobileMenu,
  project,
}) => {
  switch (project) {
    case PROJECT_PREFIXS.TOURNAMENT_PROJECT_PREFIX:
      return <TournamentsSubMenu closeMobileMenu={closeMobileMenu} />
    default:
      return null
  }
}

getCustomSubMenu.propTypes = {
  closeMobileMenu: PropTypes.func.isRequired,
  project: PropTypes.string.isRequired,
}
const AppAdapter = ({ routesNode }) => {
  const {
    tournament,
    liveStreamUrl,
    tournamentLinkUrl,
  } = useActiveTournament()
  return (
    <App
      tournament={tournament}
      tournamentLinkUrl={tournamentLinkUrl}
      liveStreamUrl={liveStreamUrl}
      globalScope={global}
      getCustomSubMenu={getCustomSubMenu}
    >
      <BaseLayout
        routesNode={routesNode}

        tournament={tournament}
        tournamentLinkUrl={tournamentLinkUrl}
        liveStreamUrl={liveStreamUrl}
      />
    </App>
  )
}
export default AppAdapter
