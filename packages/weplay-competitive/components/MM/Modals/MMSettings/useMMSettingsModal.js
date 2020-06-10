import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { $propEq } from 'weplay-core/$utils/$propEq'

import { laddersSelectors } from 'weplay-competitive/reduxs/ladders'
import { MATCH_STATUSES } from 'weplay-competitive/constants/matchStatuses'

import { GAME_MODES, GAME_SERVERS } from './config'

export const useMMSettingsModal = () => {
  const [activeMode, setActiveMode] = useState(GAME_MODES[0])
  const [activeServer, setActiveServer] = useState(GAME_SERVERS[0])
  const [activeLadder, setActiveLadder] = useState(null)
  const filteredLaddersByModeType = useSelector(
    laddersSelectors.createRecordsByFilterSelector(
      () => $propEq('ladderType', activeMode?.name) && $propEq('ladderStatus', MATCH_STATUSES.ONGOING),
    ),
  )
  const isActiveSettingsSetupBtn = activeMode?.name && activeServer?.name && activeLadder?.name

  useEffect(() => {
    if (!activeLadder && filteredLaddersByModeType[0]) {
      setActiveLadder(filteredLaddersByModeType[0])
    }
  }, [filteredLaddersByModeType, activeLadder])

  return {
    activeMode,
    activeLadder,
    activeServer,
    setActiveMode,
    setActiveLadder,
    setActiveServer,
    filteredLaddersByModeType,
    isActiveSettingsSetupBtn,
  }
}
