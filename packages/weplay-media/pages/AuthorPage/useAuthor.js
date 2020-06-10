import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useParams } from 'weplay-singleton/RouterProvider/useParams'
import { useHistory } from 'weplay-singleton/RouterProvider/useHistory'

import { goTo, NAMES } from 'weplay-core/routes'
import useAction from 'weplay-core/helpers/useAction'

import { authorActions, authorSelectors } from 'weplay-media/reduxs/authors'

export const useAuthor = () => {
  const { locale } = useLocale()
  const dispatch = useDispatch()
  const { authorId } = useParams()
  const history = useHistory()

  const author = useSelector(authorSelectors.createRecordByIdSelector(authorId))
  const isColumnist = author?.authorType === 'columnist'
  const { getAuthor } = useAction({ getAuthor: authorActions.findRecord.request })

  useEffect(() => {
    getAuthor({
      id: authorId,
      language: locale,
    }).catch(() => {
      goTo({
        name: NAMES.NOT_FOUND,
        history,
      })
    })
  }, [authorId, locale, dispatch, getAuthor, history])

  return {
    author,
    isColumnist,
  }
}
