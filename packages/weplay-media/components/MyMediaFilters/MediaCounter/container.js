import i18n from 'i18n-react'
import {
  compose,
  withPropsOnChange,
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

  withPropsOnChange([
    'userArticlesCount',
    'isSearchFilterActive',
    'pageName',
  ], ({
    userArticlesCount,
    isSearchFilterActive,
    pageName,
  }) => ({
    countResultText: i18n.translate('myMedia.sorting.mediaCount', {
      context: {
        type: isSearchFilterActive ? 'search' : pageName,
        count: userArticlesCount,
      },
    }),
  })),
)

export default container
