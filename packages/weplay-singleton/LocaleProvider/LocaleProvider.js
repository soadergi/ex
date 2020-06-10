import React, {
  useCallback,
  useState,
} from 'react'
import { IntlProvider } from 'react-intl'
import * as PropTypes from 'prop-types'

import { LocaleContext } from './localeContext'

const wrapWithParagraphs = text => text.split('\\n').join('\n')
function flattenMessages(nestedMessages, prefix = '') {
  if (nestedMessages === null || nestedMessages === undefined) {
    return {}
  }
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key]
    const prefixedKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === 'string') {
      messages[prefixedKey] = wrapWithParagraphs(value) // eslint-disable-line
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey))
    }

    return messages
  }, {})
}

const missingMessageText = 'Missing message: "'
const missingMessages = []
if (typeof window !== 'undefined') {
  window.missingMessages = missingMessages
} else {
  global.missingMessages = missingMessages
}
const handleError = (message) => {
  if (message.includes(missingMessageText)) {
    const key = message.split(missingMessageText)?.[1]?.split('"')?.[0]
    missingMessages.push(key)
  }
}
const LocaleProvider = ({
  children,
  initialLocale,
  initialMessages,
}) => {
  const [locale, setLocale] = useState(initialLocale)
  const [messages, setFlatMessages] = useState(flattenMessages(initialMessages))
  const setMessages = useCallback((newMessages) => {
    setFlatMessages(flattenMessages(newMessages))
  }, [setFlatMessages])
  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      onError={handleError}
    >
      <LocaleContext.Provider value={{ locale, setLocale, setMessages }}>
        {children}
      </LocaleContext.Provider>
    </IntlProvider>
  )
}

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialLocale: PropTypes.string.isRequired,
  initialMessages: PropTypes.shape({}).isRequired,
}

export default React.memo(LocaleProvider)
