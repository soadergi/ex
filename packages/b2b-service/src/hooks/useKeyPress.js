import { useEffect } from 'react'

export const useKeyPress = (targetKey, cb) => {
  const handleKeypress = ({ key }) => {
    if (key === targetKey) cb()
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeypress)
    return () => {
      window.removeEventListener('keyup', handleKeypress)
    }
  })
}
