import {
  useCallback,
  useState,
  useEffect,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { $hasData } from 'weplay-core/$utils/$hasData'
import { usePrevious } from 'weplay-core/hooks/usePrevious'
import { updateUser } from 'weplay-core/reduxs/_legacy/auth/actions'
import { isLoggedInSelector, userMediaTagsSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import { getTagsType } from 'weplay-media/pages/CategoryPage/helpers'

import { TAGS_TYPES } from '../config'

const EMPTY_TAGS = {
  special_tags: [],
  unusual_tags: [],
  tags: [],
}

export const useCategoryTags = ({ categoryTags, categoryId }) => {
  const dispatch = useDispatch()
  const [selectedTags, setSelectedTags] = useState(EMPTY_TAGS)

  const isLoggedIn = useSelector(isLoggedInSelector)
  const userMediaTags = useSelector(userMediaTagsSelector)
  const wasLoggedIn = usePrevious(isLoggedIn)
  const getIsTagActive = useCallback(tag => selectedTags[getTagsType(tag.type)].includes(tag.id), [selectedTags])

  const categoryTagsIds = categoryTags.map(categoryTag => categoryTag.id)

  const selectedByCategoryTags = TAGS_TYPES.reduce((acc, type) => ({
    ...acc,
    [type]: selectedTags[type].filter(tag$ => categoryTagsIds.includes(tag$)),
  }), {})

  const isSelectedTagsEmpty = Object.entries(selectedByCategoryTags).toString()
    === Object.entries(EMPTY_TAGS).toString()

  const handleTagSelect = useCallback((tag) => {
    const tagsType = getTagsType(tag.type)
    if (getIsTagActive(tag)) {
      setSelectedTags({
        ...selectedTags,
        [tagsType]: selectedTags[tagsType].filter(tagToFilter => tagToFilter !== tag.id),
      })
    } else {
      setSelectedTags({
        ...selectedTags,
        [tagsType]: selectedTags[tagsType].concat([tag.id]),
      })
    }
  }, [selectedTags, getIsTagActive])

  useEffect(() => {
    if (!isLoggedIn && categoryId) {
      setSelectedTags(EMPTY_TAGS)
    }
  }, [isLoggedIn, categoryId])

  useEffect(() => {
    if (isLoggedIn && $hasData(categoryTags)) {
      dispatch(updateUser({
        body: {
          selected_media_tags: selectedTags,
        },
      }, {
        headers: { 'Content-Type': 'application/json' },
      }))
    }
  }, [selectedTags, isLoggedIn, dispatch, categoryTags])

  const mergeTags = useCallback(() => {
    const result = {}
    if (userMediaTags) {
      Object.keys(selectedTags).forEach((key) => {
        result[key] = selectedTags[key].concat(userMediaTags[key])
      })
    }
    return result
  }, [selectedTags, userMediaTags])

  useEffect(() => {
    if (isLoggedIn && !wasLoggedIn) {
      const tags = mergeTags()
      setSelectedTags(tags)
    }
  }, [isLoggedIn, wasLoggedIn, mergeTags])

  return {
    handleTagSelect,
    resetSelectedTags: () => setSelectedTags(EMPTY_TAGS),
    getIsTagActive,
    selectedTags,
    isSelectedTagsEmpty,
    selectedByCategoryTags,
  }
}
