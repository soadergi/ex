import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { socialChannels } from 'weplay-events/pages/EventPage/constants'

export const useSocialChannels = () => {
  const { locale } = useLocale()
  const { tournamentDiscipline } = useParams()

  const socialChannelsList = useMemo(
    () => (
      [
        socialChannels.youtube.default[locale],
        socialChannels.youtube[locale][tournamentDiscipline],
        socialChannels.twitch[locale],
      ].filter(socialChannelItem => Boolean(socialChannelItem))
    ),
    [locale, tournamentDiscipline],
  )

  return { socialChannelsList }
}
