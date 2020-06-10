import { readNewspaper } from 'weplay-core/reduxs/news/actions'
import { goTo, NAMES } from 'weplay-core/routes'

export const getInitialData = ({
  history,
  articleId,
}) => (dispatch, getState) => {
  const readNewspaperRequest = readNewspaper.request({
    articleId,
  })

  return Promise.all([
    readNewspaperRequest(dispatch, getState),
  ]).then(
    ([response]) => {
      if (!response.data.length) {
        goTo({
          name: NAMES.NOT_FOUND,
          history,
        })
      }
    },
    errorWhenRequest => Promise.reject(errorWhenRequest.error),
  )
}
