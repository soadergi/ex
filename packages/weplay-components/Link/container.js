import {
  compose,
  pure,
} from 'recompose'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

const container = compose(
  pure,
  withLocale,
)

export default container
