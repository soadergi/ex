import React from 'react'

import { useModal } from 'weplay-singleton/ModalsProvider/useModal'

import Button, { BUTTON_COLOR } from 'weplay-components/Button'

const CTAButton = ({
  text,
  ...props
}) => {
  const contactUsModal = useModal('contactUs')
  return (
    <Button
      {...props}
      onClick={contactUsModal.show}
      color={BUTTON_COLOR.CTA}
    >
      {text}
    </Button>
  )
}

export default React.memo(CTAButton)
