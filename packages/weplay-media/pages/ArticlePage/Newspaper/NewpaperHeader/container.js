import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { ARTICLE_TYPES } from 'weplay-core/consts/articleTypes'
import getArticleImage from 'weplay-core/helpers/getArticleImage'
import { isTabletWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { getIsMediaArticle } from 'weplay-core/helpers/getIsMediaArticle'

const AUDIO_URL_DOMAIN = 'soundcloud.com'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    isTabletWidth: isTabletWidthSelector,
  }), {
    // actionCreators
  }),
  withPropsOnChange([
    'newspaper',
  ], ({
    newspaper,
  }) => ({
    isLongread: newspaper.articleType === ARTICLE_TYPES.LONGREAD,
    articleMediaUrl: newspaper.mediaIframeLink,
    isMediaArticle: getIsMediaArticle(newspaper),
    isAudioArticle: newspaper.articleType === ARTICLE_TYPES.AUDIO
      || (newspaper.articleType === ARTICLE_TYPES.INTERVIEW
        && Boolean(newspaper.mediaIframeLink?.includes(AUDIO_URL_DOMAIN))),
  })),
  withPropsOnChange([
    'isTabletWidth',
    'isLongread',
    'isMediaArticle',
  ], ({
    isTabletWidth,
    isLongread,
    isMediaArticle,
  }) => ({
    isWhiteBreadcrumbs: !isTabletWidth && (isLongread || isMediaArticle),
  })),

  withPropsOnChange([
    'newspaper',
    'isLongread',
  ], ({
    newspaper,
    isLongread,
  }) => ({
    newspaperWriter: R.prop('author', newspaper) || R.propOr({}, 'columnist', newspaper),
    bigArticleImage: getArticleImage(newspaper, isLongread ? 'longread' : 'large'),
    breadcrumbsEntityName: newspaper.title ?? '',
  })),
)

export default container
