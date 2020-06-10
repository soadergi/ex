import React from 'react'
import PropTypes from 'prop-types'

import { useModal } from 'weplay-singleton/ModalsProvider/useModal'

import ModalBase from 'weplay-components/ModalBase'

const ModalBaseCtrl = ({
  // required props
  children,
  modalName,

  // container props

  // optional props
}) => {
  const modal = useModal(modalName)
  return (
    <ModalBase
      handleClose={modal.hide}
      isShown={modal.isShown}
    >
      {children({
        modal,
      })}
    </ModalBase>
  )
}
ModalBaseCtrl.propTypes = {
  // required props
  children: PropTypes.func.isRequired,
  modalName: PropTypes.string.isRequired,
  // container props

  // optional props
}

ModalBaseCtrl.defaultProps = {
  // optional props
}

export default React.memo(ModalBaseCtrl)
