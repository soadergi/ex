import {
  compose,
  withHandlers,
  lifecycle,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),

  withHandlers(() => {
    let scrollbars
    return {
      handleScrollbarsMount: () => (ref) => {
        scrollbars = ref
      },
      scrollToMainSlide: () => () => {
        // TODO: Front-end fix please, check use func without setTimeout, bug with resize width for block
        if (scrollbars) {
          setTimeout(() => {
            scrollbars.scrollLeft(476)
          }, 1000)
        }
      },
    }
  }),

  lifecycle({
    componentDidMount() {
      this.props.scrollToMainSlide()
    },
  }),
)

export default container
