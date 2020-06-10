import { useIntl } from 'react-intl'

export const useLanguage = () => {
  const intl = useIntl()
  return intl.locale
}
