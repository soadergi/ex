import { useRef, useCallback } from 'react'

function useScrollIntoView({
  behavior,
  block,
} = {
  behavior: 'smooth',
  block: 'start',
}) {
  const ref = useRef(null)

  const scrollIntoView = useCallback(() => {
    if (!ref?.current) {
      return
    }
    ref.current.scrollIntoView({ behavior, block })
  }, [ref])

  return [
    ref,
    scrollIntoView,
  ]
}

export default useScrollIntoView
