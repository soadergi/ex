import { useCallback, useEffect, useRef } from 'react'

import { getMiniGamesSocketUrl } from 'weplay-mini-games/helpers/getMiniGamesSocketUrl'

export const useGameService = ({
  gameId,
  gameEngineName,
  handleResponse,
}) => {
  const refSocket = useRef()
  const socketUrl = getMiniGamesSocketUrl({ gameEngineName, gameId })

  const sendCommand = useCallback((command, data) => {
    refSocket.current.send(JSON.stringify({ command, data }))
  }, [])

  useEffect(() => {
    refSocket.current = new WebSocket(socketUrl)

    return () => refSocket.current?.close()
  }, [socketUrl])

  useEffect(() => {
    const socket = refSocket.current

    if (socket) {
      socket.onmessage = (res) => {
        const data = JSON.parse(res.data)
        handleResponse(data)
      }
    }
  }, [handleResponse])

  return {
    sendCommand,
  }
}
