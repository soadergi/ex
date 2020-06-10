import {
  compose,
  withHandlers,
  withState,
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
  withState('isOpened', 'setOpen', false),
  withHandlers({
    handleClick: ({ setOpen, isOpened }) => () => {
      setOpen(!isOpened)
    },
  }),
)

export default container
