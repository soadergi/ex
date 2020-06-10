import React from 'react'
import ReactDOM from 'react-dom'
import CTAButton from 'components/CTAButton/CTAButton'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

const isClient = typeof window !== 'undefined'
const ContactUsButtonPortal = () => {
  const t = useTranslation()
  return isClient && ReactDOM.createPortal(
    <CTAButton text={t('header.ctaButton.text')} />,
    window.document.getElementById('UserAuthControlsPortal'),
  )
}

export default ContactUsButtonPortal
