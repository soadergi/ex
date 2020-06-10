import * as R from 'ramda'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { $hasData } from 'weplay-core/$utils/$hasData'
import { ARTICLE_STATUS } from 'weplay-core/config'
import useAction from 'weplay-core/helpers/useAction'
import { isUserAdminSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { clearBackofficeContent, setBackofficeContent } from 'weplay-core/reduxs/contentEditLink/actions'

const getContentInfo = (entity) => {
  if (entity.articleId) {
    return {
      path: `news/edit/${entity.articleId}/#${entity.language}`,
      isPublished: !entity.status || entity.status === ARTICLE_STATUS.PUBLISHED,
    }
  }
  if (entity.tagId) {
    return {
      path: `tags/edit/${R.contains('unusual-tags', entity.url) ? 'with-cover/' : ''}${entity.tagId}`,
      isPublished: entity.isActive,
    }
  }
  if (entity.specialTagId) {
    return {
      path: `tags/edit/special-project/${entity.specialTagId}/?lang=${entity.language}`,
      isPublished: entity.isActive,
    }
  }
  if (entity.authorId) {
    return {
      path: `authors/edit/${entity.authorId}`,
      isPublished: entity.status === 'active',
    }
  }
  return { isPublished: true }
}

export const useContentStatus = () => {
  const isUserAdmin = useSelector(isUserAdminSelector)
  const {
    setContentEditLink,
    clearContentEditLink,
  } = useAction({
    setContentEditLink: setBackofficeContent,
    clearContentEditLink: clearBackofficeContent,
  })

  const handleContentStatus = useCallback((entity) => {
    if ($hasData(entity) && isUserAdmin) {
      setContentEditLink(getContentInfo(entity))
    }
  }, [isUserAdmin])

  useEffect(() => clearContentEditLink, [clearContentEditLink])

  return { handleContentStatus }
}
