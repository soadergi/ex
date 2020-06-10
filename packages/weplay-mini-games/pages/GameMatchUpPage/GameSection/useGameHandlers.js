import { useCallback } from 'react'

import { useGameService } from 'weplay-mini-games/services/gameService/useGameService'
import { GAME_ENGINE_NAMES, SERVICE_COMMANDS } from 'weplay-mini-games/services/gameService/config'

export const useGameHandlers = ({
  gameId,
  handleGameData,
  closeModal,
}) => {
  const { sendCommand } = useGameService({
    gameId,
    gameEngineName: GAME_ENGINE_NAMES.PAIRS,
    handleResponse: handleGameData,
  })

  const handleGameStart = useCallback(() => {
    closeModal()
    sendCommand(SERVICE_COMMANDS.START)
  }, [closeModal, sendCommand])

  const handleGameRestart = useCallback(() => {
    closeModal()
    sendCommand(SERVICE_COMMANDS.RESTART)
  }, [closeModal, sendCommand])

  const sendTilePosition = useCallback((x, y) => {
    sendCommand(SERVICE_COMMANDS.ACTION, { x, y })
  }, [sendCommand])

  return {
    handleGameStart,
    handleGameRestart,
    sendTilePosition,
  }
}
