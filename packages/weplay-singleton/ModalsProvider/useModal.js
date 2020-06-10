import { useContext } from 'react'

import { ModalContext } from './modalContext'

export const useModal = (modalName) => {
  const modals = useContext(ModalContext)
  return modals[modalName]
}
