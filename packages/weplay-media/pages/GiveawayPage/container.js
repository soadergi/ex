import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { lastNNewsSelector } from 'weplay-core/reduxs/news/reducer'
import { readNews } from 'weplay-core/reduxs/news/actions'
import useAction from 'weplay-core/helpers/useAction'
import { getEventsList } from 'weplay-core/consts/eventCards'

const GIVEAWAY_PAGE_NEWS_LIMIT = 3

export const useGiveawayPage = () => {
  const first3news = useSelector(lastNNewsSelector(GIVEAWAY_PAGE_NEWS_LIMIT))
  const { readNewsRequest } = useAction({ readNewsRequest: readNews.request })
  const { locale } = useLocale()

  const promoEvent = useMemo(() => getEventsList(locale)[0], [locale])

  useEffect(() => {
    readNewsRequest({
      language: locale,
      limit: GIVEAWAY_PAGE_NEWS_LIMIT,
      sort: '-published',
    })
  }, [locale])

  return {
    first3news,
    promoEvent,
  }
}
