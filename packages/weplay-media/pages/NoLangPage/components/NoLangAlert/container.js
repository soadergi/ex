import * as R from 'ramda'
import {
  compose,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import transliterate from 'weplay-core/helpers/translit'
import { i18nTextsSelector, currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import { getPrefix } from 'weplay-core/routes/_helpers'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'

const container = compose(
  withRouter,
  withAnalytics,
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    currentLanguage: currentLanguageSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'match',
    'currentLanguage',
  ], ({
    match,
    currentLanguage,
  }) => ({
    itemId: R.path(['params', 'itemId'], match),
    specialTagAnotherLang: currentLanguage === 'en' ? 'ru' : 'en',
  })),

  withPropsOnChange([
    'articleAnotherLang',
    'articleTitleAnotherLang',
    'specialTagAnotherLang',
    'itemId',
  ], ({
    articleAnotherLang,
    articleTitleAnotherLang,
    specialTagAnotherLang,
    itemId,
  }) => ({
  // TODO: @Anatoliy think about better solution
    toNextArticle: `${getPrefix(
      articleAnotherLang || specialTagAnotherLang,
    )}/news/${transliterate(articleTitleAnotherLang)}-${itemId}`,
  })),

  withHandlers({
    logReadArticleClick: ({
      logAnalytics,
    }) => () => {
      logAnalytics({
        eventAction: 'Read this article here',
      })
    },
  }),
)

export default container
