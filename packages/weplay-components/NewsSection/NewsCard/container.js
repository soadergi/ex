import * as R from 'ramda'
import {
  compose,
  branch,
  renderNothing,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { transformUrl } from 'weplay-core/helpers/transformUrl'
import { getWriterUrl } from 'weplay-core/helpers/getWriterUrl'
import { getWriterTitle } from 'weplay-core/reduxs/helpers'
import { createNewspaperByIdSelector } from 'weplay-core/reduxs/news/reducer'
import getArticleImage from 'weplay-core/helpers/getArticleImage'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    newspaper: createNewspaperByIdSelector(R.prop('newsId')),
  }), {
    // actionCreators
  }),

  branch(
    ({ newspaper }) => R.or(R.isNil(newspaper), R.isEmpty(newspaper)),
    renderNothing,
  ),

  withPropsOnChange([
    'newspaper',
    'modifiers',
  ], ({
    newspaper,
    modifiers,
  }) => ({
    title: R.prop('title', newspaper),
    url: `/news/${transformUrl(newspaper)}`, // TODO: @Andrew, use more general solution
    image: newspaper.columnist
      ? {
        url: newspaper.columnist.avatar.path,
        alt: getWriterTitle(newspaper.columnist),
      }
      : getArticleImage(newspaper, 'big'),
    counters: R.prop('counters', newspaper),
    publishedDate: R.prop('publishedDate', newspaper),
    isColumnistNewspaper: !R.isNil(R.prop('columnist', newspaper)),
    columnistLink: newspaper.columnist
      ? `/columnists/${getWriterUrl(getWriterTitle(newspaper.columnist), newspaper.columnist.authorId)}`
      : null,
    isBookmarked: R.prop('isInBookmark', newspaper),
    isLargeNews: R.contains('newsLargeCard', modifiers),
    columnist: newspaper.columnist,
  })),
)

export default container
