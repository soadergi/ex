import {
  compose,
  withHandlers,
  withPropsOnChange,
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
    clickHandler: ({ setOpen, isOpened }) => () => {
      setOpen(!isOpened)
    },
  }),
  withPropsOnChange([
    'i18nTexts',
    'isOpened',
  ], (({
    isOpened,
    i18nTexts,
  }) => ({
    buttonText: i18nTexts.mediaCore.seoBlock[isOpened ? 'btnClose' : 'btnOpen'],
  }))),

)

export default container
