import { useCallback } from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import useMoment from 'weplay-core/hooks/useMoment'

export const useFormatDatetime = () => {
  const t = useTranslation()
  const { moment } = useMoment()
  const { locale } = useLocale()

  return useCallback((dateTime, params) => {
    if (!moment || !locale || !t) {
      return ''
    }
    const { formatKey, fromNow } = params
    const format = formatKey ? t(`date.formats.${formatKey}`) : t('date.formats.short')
    const localizedMoment = moment(dateTime).locale(locale)
    if (fromNow) {
      return localizedMoment.fromNow()
    }
    return localizedMoment.format(format)
  },
  [t, moment, locale])
}
