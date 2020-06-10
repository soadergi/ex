import { compose } from 'recompose'

import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'

const container = compose(

  withPageViewAnalytics({
    errorCode: 404,
  }),
)

export default container
