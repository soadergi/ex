import React from 'react'

import { useModal } from './useModal'

const withModal = modalName => WrappedComponent => (props) => {
  const modal = useModal(modalName)
  const modalProps = { [`${modalName}Modal`]: modal }
  return (
    <WrappedComponent
      {...props}
      {...modalProps}
    />
  )
}

export default withModal
