import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { getIsMediaArticle } from 'weplay-core/helpers/getIsMediaArticle'
import {
  createNewspapersByIdsSelector,
  createNewspaperByIdsSelector,
} from 'weplay-core/reduxs/news/reducer'
import { topSliderNewsSelector } from 'weplay-core/reduxs/sections/reducer'

export const useTopArticles = ({ latestIds }) => {
  const t = useTranslation()

  const latestNews = useSelector(createNewspapersByIdsSelector(latestIds))
  const topNews = useSelector(topSliderNewsSelector)
  const firstTopNewsId = topNews[0]?.newsId
  const [activeNewsPaperId, setActiveNewsPaperId] = useState(firstTopNewsId)
  const activeNewsPaper = useSelector(createNewspaperByIdsSelector(activeNewsPaperId))

  const articleIcons = {
    5: 'headphones',
    4: 'youtube',
    1: 'news',
    3: 'news',
  }

  const isMediaArticle = useMemo(() => getIsMediaArticle(activeNewsPaper),
    [activeNewsPaper])

  const getNewspaperInfoText = (newspaper) => {
    if (getIsMediaArticle(newspaper)) {
      return newspaper.mediaDuration
    }
    return t('mediaCore.timeCounter.timeToRead', { count: newspaper.timeToRead })
  }

  useEffect(() => {
    setActiveNewsPaperId(firstTopNewsId)
  }, [firstTopNewsId])

  return {
    latestNews,
    topNews,
    activeNewsPaper,
    setActiveNewsPaperId,
    getNewspaperInfoText,
    isMediaArticle,
    articleIcons,
  }
}
