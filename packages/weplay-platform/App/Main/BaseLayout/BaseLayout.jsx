import React from 'react'
import * as PropTypes from 'prop-types'
import ToastNotifications from 'weplay-core/services/toastNotifications/ToastNotifications'
import LazyDiv from 'weplay-components/LazyDiv'
import UserAuthControlsPortal from 'weplay-components/UserAuthControlsPortal/UserAuthControlsPortal'
import Modals from 'weplay-platform/components/Modals/loadable'

import Notifications from './Notifications/loadable'
import FooterSubscribeFormPortal from './FooterSubscribeFormPortal/loadable'
import BotWidget from './BotWidget/BotWidget'
import ActiveStream from './ActiveStream'
import ActiveTournament from './ActiveTournament'

const BaseLayout = ({
  // required
  routesNode,
  tournamentLinkUrl,
  liveStreamUrl,
  // container
  // optional
  tournament,
}) => (
  <>
    <UserAuthControlsPortal />

    <ActiveTournament
      tournament={tournament}
      tournamentLinkUrl={tournamentLinkUrl}
      liveStreamUrl={liveStreamUrl}
    />

    <ActiveStream />
    {routesNode}
    <LazyDiv offset={-200}>
      <FooterSubscribeFormPortal />
    </LazyDiv>

    <BotWidget />

    <Modals />

    <Notifications />
    <ToastNotifications />
  </>
)

BaseLayout.propTypes = {
  routesNode: PropTypes.node.isRequired,

  tournamentLinkUrl: PropTypes.string.isRequired,
  liveStreamUrl: PropTypes.string.isRequired,
  // optional
  tournament: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    logoUrl: PropTypes.string,
    logoAlt: PropTypes.string,
    shortName: PropTypes.string,
  }),
}
BaseLayout.defaultProps = {
  tournament: undefined,
}

export default React.memo(BaseLayout)
