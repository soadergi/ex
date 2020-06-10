import React from 'react'

import { useLocale } from './localeContext'
import { useTranslation } from './useTranslation'

const withLocale = WrappedComponent => (props) => {
  const { setMessages, setLocale, locale } = useLocale()
  const t = useTranslation()
  return (
    <WrappedComponent
      {...props}
      setMessages={setMessages}
      setLocale={setLocale}
      locale={locale}
      t={t}
    />
  )
}

export default withLocale
