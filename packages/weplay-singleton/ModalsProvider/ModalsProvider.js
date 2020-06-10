import React from 'react'
import * as PropTypes from 'prop-types'

import { ModalContext } from './modalContext'
import { useCreateModal } from './useCreateModal'

const ModalsProvider = ({
  children,
  modalInitialValues = {},
}) => {
  const modalHash = {}
  Object.keys(modalInitialValues).forEach((modalName) => {
    modalHash[modalName] = useCreateModal({
      initialState: modalInitialValues[modalName],
    })
  })
  return (
    <ModalContext.Provider value={modalHash}>
      {children}
    </ModalContext.Provider>
  )
}

ModalsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  modalInitialValues: PropTypes.shape().isRequired,
}

export default React.memo(ModalsProvider)
