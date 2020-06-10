import PropTypes from 'prop-types'
import queryString from 'query-string'
import * as R from 'ramda'
import { createStructuredSelector } from 'reselect'
import {
  compose,
  defaultProps,
  lifecycle,
  withHandlers,
  withStateHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { $prop } from 'weplay-core/$utils/$prop'
import { currentLanguageSelector, i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { readNews } from 'weplay-core/reduxs/news/actions'
import {
  createNewsByIdSelector,
  isReadNewsLoadingSelector,
  readNewsHasMoreSelector,
  readNewsPageNumSelector,
} from 'weplay-core/reduxs/news/reducer'

const DEFAULT_FETCH_LIMIT = 20

const container = compose(
  withRouter,
  // TODO: @Andrew, store already fetched data for immediately render
  withStateHandlers({
    newsIds: [],
  }, {
    setNewsIds: () => newsIds => ({
      newsIds,
    }),
    updateNewsIds: ({ newsIds }) => additionalNewsIds => ({
      newsIds: R.concat(newsIds, additionalNewsIds),
    }),
    resetNewsIds: () => () => ({
      newsIds: [],
    }),
  }),

  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    currentLanguage: currentLanguageSelector,
    storedNewsList: createNewsByIdSelector(R.prop('newsIds')),
    isLoadingReadNews: isReadNewsLoadingSelector,
    readNewsHasMore: readNewsHasMoreSelector,
    pageNum: readNewsPageNumSelector,
  }), {
    readNews: readNews.request,
  }),

  defaultProps({
    isHiddenNewsShown: false,
  }),
  withPropsOnChange([
    'fetchLimit',
  ], ({
    fetchLimit,
  }) => ({
    limit: fetchLimit || DEFAULT_FETCH_LIMIT,
  })),

  withHandlers({
    fetchNews: ({
      readNews, // eslint-disable-line no-shadow
      pageNum,
      currentLanguage,
      tagsIds,
      unusualTagsIds,
      specialTagsIds,
      authorId,
      only,
      isHiddenNewsShown,
      articleTypeId,
      categoryId,
      limit,
    }) => additionalParams => readNews({
      language: currentLanguage,
      tag: tagsIds?.join(','),
      unusualTag: unusualTagsIds?.join(','),
      specialTag: specialTagsIds?.join(','),
      author: authorId,
      only,
      sort: '-published',
      showHiddenFromListing: Number(isHiddenNewsShown),
      limit,
      offset: pageNum * limit,
      articleTypeId,
      category: categoryId,
      ...additionalParams,
    }),
  }),

  withHandlers({
    fetchInitialNews: ({
      fetchNews,
      location,
      limit,
      setNewsIds,
      onEmptyResponse,
    }) => () => {
      const urlPageNum = R.pipe(
        queryString.parse,
        R.propOr(null, 'page'),
        Number,
      )(location.search)
      fetchNews({
        offset: urlPageNum ? (urlPageNum - 1) * limit : 0,
      }).then(response => (response.data.length
        ? setNewsIds(response.data.map($prop('newsId')))
        : onEmptyResponse()))
    },
    fetchMoreNews: ({ fetchNews, updateNewsIds }) => () => fetchNews()
      .then(response => updateNewsIds(response.data.map($prop('newsId')))),
  }),

  lifecycle({
    componentDidMount() {
      this.props.fetchInitialNews()
    },

    componentDidUpdate(prevProps) {
      if (prevProps.language !== this.props.language
        || !R.equals(this.props.tagsIds, prevProps.tagsIds)
        || !R.equals(this.props.specialTagsIds, prevProps.specialTagsIds)
        || !R.equals(this.props.unusualTagsIds, prevProps.unusualTagsIds)
        || !R.equals(this.props.categoryId, prevProps.categoryId)
        || !R.equals(this.props.articleTypeId, prevProps.articleTypeId)
        || !R.equals(this.props.authorId, prevProps.authorId)
      // TODO: @Andrew, @Artem, rewrite this container to a hook, and remove this creepy stuff
      ) {
        this.props.fetchInitialNews()
      }
    },
  }),
)

container.propTypes = {
  // TODO: group all these kind of filter into one object to use
  specialTagsIds: PropTypes.arrayOf(PropTypes.number),
  unusualTagsIds: PropTypes.arrayOf(PropTypes.number),
  authorId: PropTypes.arrayOf(PropTypes.number),
  only: PropTypes.arrayOf(PropTypes.number),
  tagsIds: PropTypes.arrayOf(PropTypes.number),
}
container.defaultProps = {
  specialTagsIds: null,
  unusualTagsIds: null,
  authorId: null,
  only: null,
  tagsIds: null,
}
export default container
