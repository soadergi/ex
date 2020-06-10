import React, { useCallback, useState } from 'react'

import ContactUsForm from './ContactUsForm/ContactUsForm'
import ContactUsSuccess from './ContactUsSuccess/ContactUsSuccess'

const ContactUsContent = ({
  onConfirm,
  isInModal,
}) => {
  const [isSuccess, setSuccess] = useState(false)
  const showSuccess = useCallback(() => setSuccess(true), [setSuccess])

  return isSuccess
    ? (
      <ContactUsSuccess
        onClick={onConfirm}
        isInModal={isInModal}
      />
    )
    : (
      <ContactUsForm
        onSuccess={showSuccess}
        isInModal={isInModal}
      />
    )
}

export default React.memo(ContactUsContent)
