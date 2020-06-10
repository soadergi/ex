import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { getIsMediaArticle } from 'weplay-core/helpers/getIsMediaArticle'
import {
  createNewspapersByIdsSelector,
} from 'weplay-core/reduxs/news/reducer'
import { topSliderNewsSelector } from 'weplay-core/reduxs/sections/reducer'

export const useTopArticles = ({ latestIds }) => {
  const t = useTranslation()

  const latestNews = useSelector(createNewspapersByIdsSelector(latestIds))
  const topSliderNews = useSelector(topSliderNewsSelector)

  const topNewsIds = useMemo(() => topSliderNews.map(item => item.newsId), [topSliderNews])

  const topNews = useSelector(createNewspapersByIdsSelector(topNewsIds))
  const articleIcons = {
    5: 'headphones',
    4: 'youtube',
    1: 'news',
    3: 'news',
  }

  const getNewspaperInfoText = (newspaper) => {
    if (getIsMediaArticle(newspaper)) {
      return newspaper.mediaDuration
    }
    return t('mediaCore.timeCounter.timeToRead', { count: newspaper.timeToRead })
  }

  return {
    latestNews,
    topNews,
    getNewspaperInfoText,
    articleIcons,
  }
}
