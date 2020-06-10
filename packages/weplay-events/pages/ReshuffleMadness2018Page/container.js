import {
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector, currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import { articlesCollectionSelector } from 'weplay-core/reduxs/_legacy/articles/reducer'
import { getArticles } from 'weplay-core/reduxs/_legacy/articles/actions'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    currentLanguage: currentLanguageSelector,
    articlesCollection: articlesCollectionSelector,
  }), {
    // actionCreators
    getArticles,
  }),

  withPageViewAnalytics(),
)

export default container
