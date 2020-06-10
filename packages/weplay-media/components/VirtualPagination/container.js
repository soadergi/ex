import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { i18nTextsSelector, currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'

const pageNumberForPagination = 2
const container = compose(
  withRouter,
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    currentLanguage: currentLanguageSelector,
  }), {
  }),

  withPropsOnChange([
    'pageNum',
    'location',
  ], ({
    pageNum,
    location,
  }) => ({
    prevLink: pageNum > pageNumberForPagination ? `${location.pathname}?page=${pageNum - 1}` : location.pathname,
    nextLink: `${location.pathname}?page=${pageNum + 1}`,
  })),
)

export default container
