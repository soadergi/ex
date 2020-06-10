import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { readAllTags } from 'weplay-media/reduxs/allTags/actions'
import { allTagsSelector } from 'weplay-media/reduxs/allTags/reducer'

export const useCategoryPageTags = (sort, categoryId) => {
  const dispatch = useDispatch()
  const { locale } = useLocale()
  const tags = useSelector(allTagsSelector)

  useEffect(() => {
    if (categoryId) {
      dispatch(readAllTags.request({
        category: categoryId,
        language: locale,
        sort,
      }))
    }
  }, [dispatch, locale, sort, categoryId])

  return tags
}
