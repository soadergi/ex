import {
  useCallback,
  useMemo,
  useState,
} from 'react'
import { useSelector } from 'react-redux'

import { WIDTH_SM } from 'weplay-core/reduxs/_legacy/layout/consts'
import { windowWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
// TODO: think about encapsulation

import {
  GAME_MODALS,
  initialGameConfig,
  tileSize,
  EXTRA_SMALL_WIDTH,
} from './config'

const getTileSize = (windowWidth) => {
  if (windowWidth < EXTRA_SMALL_WIDTH) return 'sm'
  if (windowWidth < WIDTH_SM) return 'md'
  return 'lg'
}

export const useGameBody = () => {
  const windowWidth = useSelector(windowWidthSelector)

  const [modalName, setModalName] = useState(GAME_MODALS.START)
  const [isGameStarted, setIsGameStarted] = useState(false)

  const gameConfig = useMemo(() => ({
    ...initialGameConfig,
    tileSize: tileSize[getTileSize(windowWidth)],
  }), [windowWidth])

  const closeModals = useCallback(() => setModalName(''), [setModalName])
  const handleGameStart = useCallback(() => {
    setIsGameStarted(true)
    closeModals()
  }, [closeModals])
  const handleGameWin = useCallback(() => setModalName(GAME_MODALS.WIN), [setModalName])
  const handleGameOver = useCallback(() => {
    setIsGameStarted(false)
    setModalName(GAME_MODALS.END)
  }, [setModalName])

  return {
    modalName,
    gameConfig,
    closeModals,
    handleGameStart,
    handleGameWin,
    handleGameOver,
    isGameStarted,
  }
}
