import { compose, pure, withHandlers } from 'recompose'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'

const container = compose(
  pure,
  withAnalytics,
  withHandlers({
    handleClick: ({ logAnalytics, bannerEventCategory, bannerEventAction }) => () => {
      logAnalytics({
        eventCategory: bannerEventCategory,
        eventAction: bannerEventAction,
      })
    },
  }),
)

export default container
