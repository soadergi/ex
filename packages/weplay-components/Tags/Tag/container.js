import * as R from 'ramda'
import {
  compose,
  pure,
  withPropsOnChange,
  withHandlers,
} from 'recompose'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import { transformToCanonicalUrl } from 'weplay-core/helpers/transformToCanonicalUrl'

const container = compose(
  withAnalytics,
  pure,
  withPropsOnChange([
    'tag',
  ], ({
    tag,
  }) => ({
    name: R.propOr('', 'name', tag),
    url: transformToCanonicalUrl(
      R.propOr('', 'url', tag),
      R.propOr('', 'name', tag),
    ) ?? '/tags',
    isSpecialTag: R.pipe(
      R.prop('specialTagId'),
      Boolean,
    )(tag),
  })),

  withHandlers({
    handleClick: ({
      logAnalytics,
      tag,
    }) => () => {
      logAnalytics({
        eventAction: 'Tag',
        eventLabel: tag.name,
      })
    },
  }),
)

export default container
