import React from 'react'
import PropTypes from 'prop-types'

import App from 'weplay-platform/App/App'

import useActiveTournament from 'weplay-events/hooks/useActiveTournament'

const AppAdapter = ({
  globalScope,
  getCustomSubMenu,
  children,
}) => {
  const {
    tournament,
    liveStreamUrl,
    tournamentLinkUrl,
  } = useActiveTournament()
  return (
    <App
      globalScope={globalScope}
      getCustomSubMenu={getCustomSubMenu}
      tournament={tournament}
      tournamentLinkUrl={tournamentLinkUrl}
      liveStreamUrl={liveStreamUrl}
    >
      {children}
    </App>
  )
}

AppAdapter.propTypes = {
  globalScope: PropTypes.shape({}).isRequired,
  getCustomSubMenu: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default React.memo(AppAdapter)
