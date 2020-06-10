import {
  compose,
  withHandlers,
} from 'recompose'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'

const container = compose(
  withAnalytics,
  withHandlers({
    logSponsorClick: ({
      logAnalytics,
      startcasePageName,
      sponsorTitle,
    }) => () => logAnalytics({
      eventCategory: `${startcasePageName} landing click`,
      eventAction: `${sponsorTitle} logo (bottom)`,
    }),
  }),
)

export default container
