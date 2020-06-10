import { connect } from 'react-redux'
import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { createStructuredSelector } from 'reselect'

import { getCanonicalUrl } from 'weplay-core/helpers/getCanonicalUrl'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'tag',
  ], ({
    tag,
  }) => ({
    name: tag.name,
    url: getCanonicalUrl({
      type: tag.type,
      name: tag.name,
      id: tag.id,
    }),
    isSpecial: tag.type === 'special_tag',
    isNoFollow: tag.name === 'B2B',
  })),
)

export default container
