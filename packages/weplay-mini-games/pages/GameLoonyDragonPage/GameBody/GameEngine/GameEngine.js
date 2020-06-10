import React, {
  useEffect,
  useMemo,
  useRef,
} from 'react'
import PropTypes from 'prop-types'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'

import { getMiniGamesSocketUrl } from 'weplay-mini-games/helpers/getMiniGamesSocketUrl'

import Game from './sevice/Game'

const NARROW_WIDTH = 320
const WIDE_WIDTH = 470

const GameEngine = ({
  className,
  onEndGame,
  isSmallWidth,
  gameId,
}) => {
  const blockRef = useRef(null)
  const socketUrl = getMiniGamesSocketUrl({ gameEngineName: 'bird', gameId })
  const canvasWidth = useMemo(() => (isSmallWidth ? NARROW_WIDTH : WIDE_WIDTH), [isSmallWidth])

  useEffect(() => {
    const game = new Game({
      cvs: blockRef.current,
      socketUrl,
      onEndGame,
    })
    if (socketUrl) {
      game.init()
    }

    return () => {
      game.destroy()
    }
  }, [blockRef, onEndGame, socketUrl])

  return (
    <canvas
      ref={blockRef}
      className={className}
      width={canvasWidth}
      height="480"
    />
  )
}

GameEngine.propTypes = {
  className: PropTypes.string.isRequired,
  onEndGame: PropTypes.func.isRequired,
  isSmallWidth: PropTypes.bool.isRequired,
  gameId: PropTypes.number.isRequired,
}

export default React.memo(withRouteInfo(GameEngine))
