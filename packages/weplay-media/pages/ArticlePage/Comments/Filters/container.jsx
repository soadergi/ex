import { compose, withHandlers } from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import { SORT } from './consts'

const container = compose(
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
  })),
  withHandlers({
    handlerSortPoplar: ({ onChange, value }) => () => {
      if (value !== SORT.POPULAR) {
        onChange(SORT.POPULAR)
      }
    },
    handlerSortAll: ({ onChange, value }) => () => {
      if (value !== SORT.ALL) {
        onChange(SORT.ALL)
      }
    },
  }),

)


export default container
