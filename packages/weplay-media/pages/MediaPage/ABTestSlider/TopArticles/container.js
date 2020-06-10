import {
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react'
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
  const newsPapersIds = useMemo(() => topNews.map(item => item.newsId), [topNews])

  const getNewspaperInfoText = (newspaper) => {
    if (getIsMediaArticle(newspaper)) {
      return newspaper.mediaDuration
    }
    return t('mediaCore.timeCounter.timeToRead', { count: newspaper.timeToRead })
  }
  const handleClick = useCallback((event) => {
    const side = event.target.closest('button')?.getAttribute('side')
    const nextActiveNewspaperIndex = side === 'left'
      ? newsPapersIds.indexOf(activeNewsPaperId) - 1 : newsPapersIds.indexOf(activeNewsPaperId) + 1
    const getNewsId = () => {
      if (nextActiveNewspaperIndex < 0) {
        return 2
      } if (nextActiveNewspaperIndex > 2) {
        return 0
      }
      return nextActiveNewspaperIndex
    }
    setActiveNewsPaperId(newsPapersIds[getNewsId()])
  }, [activeNewsPaperId])

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
    handleClick,
  }
}
