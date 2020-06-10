import {
  compose,
  withHandlers,
} from 'recompose'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'

const container = compose(
  withAnalytics,
  withHandlers({
    handleClickAnalytics: props => () => {
      props.logAnalytics({
        eventCategory: 'Social',
        eventAction: 'click',
        eventLabel: props.analyticEventLabel,
        eventContext: props.path,
        eventPosition: props.position,
      })
    },
  }),
)

export default container
