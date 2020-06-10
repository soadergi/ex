import { useCallback, useState } from 'react'

export const useCreateModal = ({
  initialState = false,
}) => {
  const [isShown, setShown] = useState(Boolean(initialState))
  const hide = useCallback(
    () => setShown(false),
    [setShown],
  )
  const show = useCallback(
    () => setShown(true),
    [setShown],
  )
  return {
    isShown,
    hide,
    show,
  }
}
