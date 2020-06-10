import { useMemo } from 'react'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import { usePageViewAnalytics } from 'weplay-core/hooks/usePageViewAnalytics'

import { botLinksByLanguage } from './config'

export const useGameLoonyDragonPage = ({ history }) => {
  const t = useTranslation()
  const { locale } = useLocale()

  const botLinks = useMemo(() => botLinksByLanguage[locale], [locale])

  const eventLink = pathWithParamsByRoute(NAMES.EVENT_PAGE, {
    tournamentDiscipline: 'dota-2',
    tournamentSlug: 'tug-of-war-mad-moon',
  })

  usePageViewAnalytics(history)

  return {
    t,
    botLinks,
    eventLink,
  }
}
