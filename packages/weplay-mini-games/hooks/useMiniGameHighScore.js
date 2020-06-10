import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import { getMaxResult } from 'weplay-mini-games/reduxs/gameLeaders/actions'

export const useMiniGameHighScore = ({ gameId }) => {
  const [highScore, setHighScore] = useState(0)
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(isLoggedInSelector)

  useEffect(() => {
    if (gameId && isLoggedIn) {
      dispatch(getMaxResult.request({ gameId })).then(res => setHighScore(res.score))
    }
  }, [gameId, dispatch, isLoggedIn])

  return {
    highScore,
  }
}
