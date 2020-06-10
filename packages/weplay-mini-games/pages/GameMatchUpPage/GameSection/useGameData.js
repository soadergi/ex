import { useCallback, useState } from 'react'

import { emptyBoard } from './config'

export const useGameData = () => {
  const [currentTime, setCurrentTime] = useState('00:00:00')
  const [board, setBoard] = useState(emptyBoard)
  const [isGameOver, setIsGameOver] = useState(false)

  const handleGameData = useCallback((data) => {
    if (data.type === 'SCORE') {
      setCurrentTime(data.score.split('.')[0])
    }
    if (data.type === 'BOARD') {
      setBoard(data.board)
    }
    setIsGameOver(data.over)
  }, [])

  return {
    currentTime,
    board,
    handleGameData,
    isGameOver,
  }
}
