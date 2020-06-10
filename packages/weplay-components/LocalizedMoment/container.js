import {
  compose,
  pure,
} from 'recompose'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import withMoment from 'weplay-core/HOCs/withMoment'

import withPreloader from 'weplay-components/withPreloader'

const container = compose(
  withPreloader({
    mapPropsToIsLoading: props => !props.dateTime,
    skeletonProps: {
      minWidth: '100px',
    },
  }),

  withMoment,
  withLocale,
  pure,
)

export default container
