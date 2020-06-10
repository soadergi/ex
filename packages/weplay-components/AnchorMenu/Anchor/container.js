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
    scrollHandler: () => (el) => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    logAnchorClick: ({
      logAnalytics,
      anchor,
    }) => () => {
      logAnalytics({
        eventAction: `${anchor.text}`,
      })
    },
  }),
)

export default container
