import React from 'react'

import { useModal } from 'weplay-singleton/ModalsProvider/useModal'

import ModalBase from 'weplay-components/ModalBase'

import ContactUsContent from './ContactUsContent/ContactUsContent'

const ContactUsModal = () => {
  const contactUsModal = useModal('contactUs')
  return (
    <ModalBase
      handleClose={contactUsModal.hide}
      isShown={contactUsModal.isShown}
    >
      <ContactUsContent
        onConfirm={contactUsModal.hide}
        isInModal
      />
    </ModalBase>
  )
}

export default React.memo(ContactUsModal)
