import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { $prop } from 'weplay-core/$utils/$prop'
import { readNews } from 'weplay-core/reduxs/news/actions'
import { createNewsByIdSelector } from 'weplay-core/reduxs/news/reducer'

export const useNewspapers = (params) => {
  const dispatch = useDispatch()
  const [ids, setIds] = useState([])
  const [isFetched, setIsFetched] = useState(false)
  const newspapers = useSelector(createNewsByIdSelector(() => ids))

  const handleResponseData = (res) => {
    if (res.data) {
      setIds(res.data.map($prop('newsId')))
    }
  }

  useEffect(() => {
    if (!isFetched) {
      dispatch(readNews.request(params))
        .then((response) => {
          handleResponseData(response)
          setIsFetched(true)
        })
    }
  }, [isFetched, dispatch, params])
  return newspapers
}
