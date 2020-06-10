import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
  withHandlers,
  lifecycle,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { $isNil } from 'weplay-core/$utils/$isNil'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import { incrementNewspaperViews } from 'weplay-core/reduxs/news/actions'
import { saveToUserHistory } from 'weplay-core/reduxs/userHistory/actions'

import { CONTENT_TYPES } from './config'

const skeletonData = [{
  id: 0,
  type: CONTENT_TYPES.TEXT,
  body: '',
}]

const ARTICLE_WITH_REGISTER_BUTTON_ID = 20702

const container = compose(
  connect(createStructuredSelector({
    // selectors
    globalScope: globalScopeSelector,
    isLoggedIn: isLoggedInSelector,
  }), {
    // actionCreators
    saveToUserHistory: saveToUserHistory.request,
    clearArticleHistoryStatus: saveToUserHistory.clear,
    incrementNewspaperViews: incrementNewspaperViews.request,
  }),
  withLocale,

  withPropsOnChange([
    'newspaper',
    'isLoggedIn',
  ], ({
    newspaper,
    isLoggedIn,
  }) => ({
    blocks: newspaper.blocks || skeletonData,
    withRegisterButton: newspaper.articleId === ARTICLE_WITH_REGISTER_BUTTON_ID && !isLoggedIn,
  })),

  withHandlers({
    handleNewspaper: ({
      globalScope,
      isLoggedIn,
      locale,
      newspaper,
      saveToUserHistory, // eslint-disable-line no-shadow
      incrementNewspaperViews, // eslint-disable-line no-shadow
    }) => () => {
      if (R.pipe(
        R.propOr('', 'body'),
        R.contains('class="playbuzz"'),
      )(newspaper)) {
        const script = globalScope.document.createElement('script')
        script.src = 'https://embed.playbuzz.com/sdk.js'
        globalScope.document.head.appendChild(script)
      }
      if (isLoggedIn) {
        saveToUserHistory(newspaper.newsId)
      }

      incrementNewspaperViews({
        articleId: newspaper.articleId,
        language: locale,
      })
    },
  }),

  lifecycle({
    componentDidMount() {
      if (!$isNil(this.props.newspaper.newsId)) {
        this.props.handleNewspaper()
      }
    },

    componentDidUpdate(prevProps) {
      const newspaperId = this.props.newspaper.newsId
      if (newspaperId && newspaperId !== prevProps.newspaper.newsId) {
        this.props.handleNewspaper()
      }
    },
  }),
)

export default container
