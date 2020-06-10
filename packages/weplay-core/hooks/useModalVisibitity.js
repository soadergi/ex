import { useState } from 'react'

export const useToggle = () => {
  const [isVisible, setIsVisible] = useState(false)

  const open = () => setIsVisible(true)
  const close = () => setIsVisible(false)
  const toggle = () => setIsVisible(!isVisible)

  return {
    isVisible,
    open,
    close,
    toggle,
  }
}
