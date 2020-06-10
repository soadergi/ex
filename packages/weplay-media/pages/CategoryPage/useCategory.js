import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useHistory } from 'weplay-singleton/RouterProvider/useHistory'
import { useParams } from 'weplay-singleton/RouterProvider/useParams'

import { goTo, NAMES } from 'weplay-core/routes'
import { startCase } from 'weplay-core/helpers/cases'

import { getCategory } from 'weplay-media/reduxs/categories/actions'
import { categorySelector } from 'weplay-media/reduxs/categories/reducer'

export const useCategory = () => {
  const { categoryName } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const category = useSelector(categorySelector)

  useEffect(() => {
    dispatch(getCategory.request({
      title: startCase(categoryName),
    })).catch(() => {
      goTo({
        name: NAMES.NOT_FOUND,
        history,
      })
    })
  }, [dispatch, categoryName, history])

  return category
}
