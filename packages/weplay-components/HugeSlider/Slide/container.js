import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { isMediumWidthLegacySelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    isMediumWidth: isMediumWidthLegacySelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'slide',
    'isMediumWidth',
  ],
  ({
    slide,
    isMediumWidth,
  }) => ({
    backgroundImage: `url(${slide.images[isMediumWidth ? 'lg' : 'md']}`,
  })),
)

export default container
