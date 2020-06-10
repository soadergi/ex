import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import useAction from 'weplay-core/helpers/useAction'
import { readNews } from 'weplay-core/reduxs/news/actions'

import { getMediaTagIdSelector } from 'weplay-events/reduxs/mediaTag/selectors'
import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'

import { NEWS_AMOUNT } from './constants'

export const useNewsSection = () => {
  const tournamentId = useCurrentTournamentId()
  const { locale } = useLocale()
  const mediaTag = useSelector(getMediaTagIdSelector)(tournamentId)
  const specialTagId = mediaTag.tagId
  const { readNewsRequest } = useAction({ readNewsRequest: readNews.request })
  const [newsSources, setSourcesList] = useState([])

  useEffect(() => {
    readNewsRequest({
      specialTag: specialTagId,
      limit: NEWS_AMOUNT,
      language: locale,
      sort: '-published',
    }).then(resp => setSourcesList(resp?.data.map(source => source.newsId)))
  }, [readNewsRequest, specialTagId, locale])

  return {
    newsSources,
    specialTagId,
  }
}
