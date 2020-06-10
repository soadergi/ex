import * as R from 'ramda'
import queryString from 'query-string'
import {
  compose,
  withPropsOnChange,
  withHandlers,
  withStateHandlers,
  lifecycle,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { currentLanguageSelector, i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { readNews } from 'weplay-core/reduxs/news/actions'
import {
  globalScopeSelector,
} from 'weplay-core/reduxs/common/selectors'
import {
  createNewsByIdSelector,
  isReadNewsErrorSelector,
  isReadNewsLoadingSelector,
  readNewsPageNumSelector,
  readNewsHasMoreSelector,
} from 'weplay-core/reduxs/news/reducer'

const FETCH_LIMIT = 20
const FIRST_PAGE_ARTICLE_START_INDEX = 5
const OTHER_PAGES_ARTICLE_START_INDEX = 20

const container = compose(
  withRouter,
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    currentLanguage: currentLanguageSelector,
    latestNews: createNewsByIdSelector(R.prop('latestIds')),
    isLoadingReadNews: isReadNewsLoadingSelector,
    isErrorReadNews: isReadNewsErrorSelector,
    readNewsHasMore: readNewsHasMoreSelector,
    pageNum: readNewsPageNumSelector,
    globalScope: globalScopeSelector,
  }), {
    // actionCreators
    readNews: readNews.request,
  }),

  withStateHandlers({
    urlPageNum: null,
  }, {
    setUrlPageNum: () => urlPageNum => ({
      urlPageNum,
    }),
  }),

  withPropsOnChange([
    'latestNews',
    'urlHasPageNum',
    'pageNum',
  ], ({
    latestNews,
    urlPageNum,
    pageNum,
  }) => ({
    articles: urlPageNum > 1
      ? R.slice(OTHER_PAGES_ARTICLE_START_INDEX, Infinity)(latestNews)
      : R.slice(FIRST_PAGE_ARTICLE_START_INDEX, Infinity)(latestNews),
    offset: pageNum * FETCH_LIMIT,
  })),

  withHandlers({
    fetchInitialNews: ({
      /* eslint-disable no-shadow */
      currentLanguage,
      offset,
      readNews,
      isLoadingReadNews,
    }) => (additionalParams) => {
      if (!isLoadingReadNews) {
        readNews({
          language: currentLanguage,
          sort: '-published',
          limit: FETCH_LIMIT,
          offset,
          ...additionalParams,
        })
      }
    },
  }),

  withHandlers({
    fetchMoreNews: ({ fetchInitialNews }) => () => fetchInitialNews(),
  }),

  lifecycle({
    componentDidMount() {
      const urlPageNum = R.pipe(
        queryString.parse,
        R.propOr(null, 'page'),
        Number,
      )(this.props.location.search)
      if (urlPageNum) {
        this.props.setUrlPageNum(urlPageNum)
        this.props.fetchInitialNews({
          offset: (urlPageNum - 1) * FETCH_LIMIT,
        })
      }
    },
  }),
)

export default container
