import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

export const useResumeWhenLocked = (videoPlayer) => {
  const { document } = useSelector(globalScopeSelector)
  const playerRef = useRef(null)
  // TODO: not sure this will ever work, maybe just to resume
  useEffect(() => {
    const intervalID = setInterval(() => {
      if (document.visibilityState === 'hidden') {
        if (!playerRef.current.player.isPlaying) {
          playerRef.current.player.player.play()
          console.log('videoPlayerRef', videoPlayer)
          console.log('playerRef.current.player.player', playerRef.current.player.player)
        }
      }
    }, 1000)
    return () => clearInterval(intervalID)
  }, [])
  return {
    playerRef,
  }
}
