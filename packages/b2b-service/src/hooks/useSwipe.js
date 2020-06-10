import { useEffect } from 'react'

const DELTA = 10
// TODO think about better solution
export const useSwipe = (onSwipeLeft, onSwipeRight) => {
  let xStart = null
  let yStart = null

  const handleTouchStart = (e) => {
    xStart = e.touches[0].clientX
    yStart = e.touches[0].clientY
  }

  const handleTouchMove = (e) => {
    if (!xStart) return
    const xEnd = e.touches[0].clientX
    const yEnd = e.touches[0].clientY
    const xDiff = xStart - xEnd
    const yDiff = yStart - yEnd
    const tangent = Math.abs(yDiff) / Math.abs(xDiff)
    if (tangent < 1 / 2) {
      if (xDiff > DELTA) {
        onSwipeLeft()
      } else if (xDiff < (-DELTA)) {
        onSwipeRight()
      }
    }
    xStart = null
    yStart = null
  }

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchmove', handleTouchMove)
    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
    }
  })
}
