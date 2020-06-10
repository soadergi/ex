import * as R from 'ramda'
import {
  compose,
  withStateHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { getTwitterPostFromLink } from 'weplay-core/helpers/getTwitterPostFromLink'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    isMobileWidth: isMobileWidthSelector,
  }), {
    // actionCreators
  }),

  withStateHandlers({
    isListExpanded: false,
  }, {
    expandList: () => () => ({
      isListExpanded: true,
    }),
  }),

  withPropsOnChange([
    'postLinks',
  ], ({
    postLinks,
  }) => ({
    posts: R.pipe(
      R.map(getTwitterPostFromLink),
      R.filter(Boolean),
    )(postLinks),
  })),
)

export default container
