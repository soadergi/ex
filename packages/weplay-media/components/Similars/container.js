import {
  compose, pure,
  withHandlers,
} from 'recompose'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'

const container = compose(
  pure,
  withAnalytics, // props: { logAnalytics }
  withHandlers({
    logSimilarClickWithParams: ({ logAnalytics }) => (category, index) => () => {
      logAnalytics({
        category,
        newsNumber: index + 1,
      })
    },
  }),
)

export default container
