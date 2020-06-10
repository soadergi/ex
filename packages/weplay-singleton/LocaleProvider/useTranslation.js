import { useIntl } from 'react-intl'
import { useCallback } from 'react'

export const useTranslation = () => {
  const intl = useIntl()
  return useCallback(
    (id, params) => {
      const message = intl.formatMessage({ id }, params)
      return message === id ? null : message
    },
    [intl],
  )
}
