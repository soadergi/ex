import {
  compose,
  withPropsOnChange,
  withStateHandlers,
  pure,
} from 'recompose'

import getArticleImage from 'weplay-core/helpers/getArticleImage'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import { getIsMediaArticle } from 'weplay-core/helpers/getIsMediaArticle'

const defaultArticle = {
  author: {},
  tags: [{ name: '' }],
  publishedDate: '',
}

const container = compose(
  withRouteInfo,
  pure,
  withStateHandlers({
    isDeletionConfirming: false,
  }, {
    toggleConfirmDeletion: ({ isDeletionConfirming }) => () => ({
      isDeletionConfirming: !isDeletionConfirming,
    }),
  }),

  withPropsOnChange([
    'history',
    'article',
    'modifier',
  ], ({
    history,
    article,
    modifier,
  }) => ({
    locationState: {
      prevPage: history.location.pathname,
    },
    articleImage: getArticleImage(article, modifier),
    isMediaArticle: getIsMediaArticle(article),
    article: article ?? defaultArticle,
  })),
)

export default container
