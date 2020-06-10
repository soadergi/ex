import React from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

import TournamentInfo from './TournamentInfo'

const isClient = typeof window !== 'undefined'
// TODO: @Stukota - fix naming here ActiveTournament is Portal to ProTournamentBlockPortal
const ActiveTournament = ({
  tournament,
  tournamentLinkUrl,
  liveStreamUrl,
}) => {
  const globalScope = useSelector(globalScopeSelector)

  if (!tournament?.id) return null
  const targetEl = globalScope.document.getElementById('ProTournamentBlockPortal')
  if (!targetEl) {
    console.error('THERE IS NO TARGET ELEMENT FOR TournamentInfo')
  }

  return isClient && targetEl && createPortal(
    <TournamentInfo
      isStreamLive={Boolean(liveStreamUrl)}
      tournament={tournament}
      tournamentLinkUrl={tournamentLinkUrl}
    />,
    targetEl,
  )
}

export default ActiveTournament
