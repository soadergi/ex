import {
  compose,
  withProps,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import withArticles from 'weplay-core/HOCs/withArticles'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import { articlesFirstNSelector } from 'weplay-core/reduxs/_legacy/articles/reducer'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

const ARTICLES_COUNT = 3

const container = compose(
  withAnalytics,
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    isLoggedIn: isLoggedInSelector,
    first3Articles: articlesFirstNSelector(ARTICLES_COUNT),
  }), {
    // actionCreators
  }),

  withProps({
    requestArticlesParams: {
      limit: 3,
      sort: '-published',
    },
  }),
  withArticles,

  withHandlers({
    handleHomeLinkClick: ({ logAnalytics }) => () => {
      logAnalytics({
        eventAction: 'To Media homepage',
      })
    },
  }),

  withPropsOnChange([
    'isLoggedIn',
    'isDeletedArticles',
  ], ({
    isLoggedIn,
    isDeletedArticles,
  }) => ({
    isUserArticlesEmpty: isLoggedIn && !isDeletedArticles,
  })),
)

export default container
