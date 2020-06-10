import {
  compose,
  withHandlers,
  pure,
} from 'recompose'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'

const container = compose(
  withAnalytics,
  pure,
  withHandlers({
    logLinkClick: ({
      contentAction,
      logAnalytics,
    }) => () => {
      logAnalytics({
        eventAction: contentAction,
      })
    },
  }),
)
export default container
