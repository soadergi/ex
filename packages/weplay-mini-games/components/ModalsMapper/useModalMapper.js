import { useCallback, useState } from 'react'

export const useModalsMapper = () => {
  const [modalName, setModalName] = useState(null)

  const openModal = useCallback(name => setModalName(name), [])
  const closeModal = useCallback(() => setModalName(null), [])
  const isModalActive = Boolean(modalName)

  return {
    modalName,
    openModal,
    closeModal,
    isModalActive,
  }
}
