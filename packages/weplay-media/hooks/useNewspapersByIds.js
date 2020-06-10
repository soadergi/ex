import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { readNews } from 'weplay-core/reduxs/news/actions'
import { createNewsByIdSelector } from 'weplay-core/reduxs/news/reducer'

export const useNewspapersByIds = (ids) => {
  const newspapers = useSelector(createNewsByIdSelector(() => ids))
  const dispatch = useDispatch()

  useEffect(() => {
    if (ids && newspapers.length < ids.length) {
      dispatch(readNews.request({ targetIds: ids.join(',') }))
    }
  }, [newspapers, ids, dispatch])

  return newspapers
}
