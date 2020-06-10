import { useSelector } from 'react-redux'
import {
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isMobileWidthSelector, isTabletWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import useAction from 'weplay-core/helpers/useAction'

import { getCommentsByIdsSelector } from 'weplay-media/reduxs/comments/reducer'
import { getComments } from 'weplay-media/reduxs/comments/actions'

export const useNewsPaperFooter = ({
  newspaper,
}) => {
  const t = useTranslation()
  const { locale } = useLocale()
  const { getNewsPaperComments } = useAction({
    getNewsPaperComments: getComments.request,
  })
  const isTableWidth = useSelector(isTabletWidthSelector)
  const isMobileWidth = useSelector(isMobileWidthSelector)
  const [commentIds, setCommentIds] = useState([])
  const comments = useSelector(getCommentsByIdsSelector(commentIds))
  const [isCommentsVisible, setIsCommentsVisible] = useState(false)
  const [commentsSort, setCommentsSort] = useState('')
  const similarBottomList = newspaper?.similar?.bottomBlock ?? []

  const commentsCount = useMemo(() => comments.filter(comment => comment.status !== 'deleted').length, [comments])

  const handleGetComments = useCallback(() => {
    getNewsPaperComments({
      params: {
        language: locale,
        source_type: 'news',
        source_id: newspaper.articleId,
        limit: 500,
        sort: commentsSort,
      },
      newspaperId: newspaper.newsId,
    }).then((response) => {
      const data = response.data.map(item => item.id)
      setCommentIds(data)
    })
  }, [newspaper.articleId, newspaper.newsId, locale, commentsSort])

  useEffect(() => {
    if (newspaper.articleId) {
      handleGetComments()
    }
  }, [newspaper.articleId])

  const handleSortComments = (event) => {
    if (event !== commentsSort) {
      setCommentsSort(event)
    }
  }

  const toggleCommentsVisibility = useCallback(() => {
    setIsCommentsVisible(!isCommentsVisible)
  }, [isCommentsVisible])

  const similarNewsList = useMemo(() => (
    isMobileWidth ? similarBottomList.slice(0, 1) : similarBottomList
  ), [isMobileWidth, similarBottomList])

  const commentsButtonText = useMemo(() => {
    if (!comments.length) {
      return (t('comments.addComment'))
    } if (isCommentsVisible) {
      return (t('comments.hideComments'))
    }
    return (`${t('comments.viewComments')} (${commentsCount})`)
  },
  [comments, commentsCount, isCommentsVisible])

  return {
    isTableWidth,
    isMobileWidth,
    commentIds,
    similarBottomList,
    toggleCommentsVisibility,
    similarNewsList,
    commentsButtonText,
    commentsSort,
    isCommentsVisible,
    handleSortComments,
    handleGetComments,
    commentsCount,
  }
}
