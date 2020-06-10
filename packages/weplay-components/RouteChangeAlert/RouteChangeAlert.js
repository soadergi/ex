import React from 'react'
import PropTypes from 'prop-types'

import { useToggle } from 'weplay-core/hooks/useModalVisibitity'

import { BUTTON_COLOR } from 'weplay-components/Button'
import ConfirmModal from 'weplay-components/Modals/ConfirmModal'

import { useUnblockHistory } from './useUnblockHistory'

const modifiers = { confirmButton: BUTTON_COLOR.CTA }

const RouteChangeAlert = ({
  title,
  subTitle,
  acceptButtonText,
  declineButtonText,
  onAccept,
  onDecline,
  isActive,
}) => {
  const {
    isVisible: isModalVisible,
    toggle: toggleModal,
  } = useToggle()
  const unblockHistory = useUnblockHistory({
    onBlock: toggleModal,
    isActive,
  })

  const handleDecline = () => {
    toggleModal()
    onDecline()
    unblockHistory()
  }
  const handleAccept = () => {
    toggleModal()
    onAccept()
  }

  return (
    <ConfirmModal
      title={title}
      subTitle={subTitle}
      confirmBtnText={acceptButtonText}
      closeBtnText={declineButtonText}
      modifiers={modifiers}
      onCloseModal={handleDecline}
      onConfirm={handleAccept}
      isShown={isModalVisible}
    />
  )
}

RouteChangeAlert.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  acceptButtonText: PropTypes.string.isRequired,
  declineButtonText: PropTypes.string.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default RouteChangeAlert
