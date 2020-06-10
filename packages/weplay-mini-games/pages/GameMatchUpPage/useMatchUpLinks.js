import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'

import { OG_IMAGES } from './config'

export const useMatchUpLinks = () => {
  const { locale } = useLocale()

  const eventLink = pathWithParamsByRoute(NAMES.EVENT_PAGE, {
    tournamentDiscipline: 'cs-go',
    tournamentSlug: 'we-play-clutch-island',
  })

  const tournamentsLink = pathWithParamsByRoute(NAMES.TOURNAMENTS, { discipline: 'cs-go' })

  const ogImage = OG_IMAGES[locale]

  return {
    eventLink,
    tournamentsLink,
    ogImage,
  }
}
