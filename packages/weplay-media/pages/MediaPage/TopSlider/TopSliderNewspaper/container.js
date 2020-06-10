import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import getArticleImage from 'weplay-core/helpers/getArticleImage'
import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import { createNewspaperByIdSelector } from 'weplay-core/reduxs/news/reducer'
import { transformUrl } from 'weplay-core/helpers/transformUrl'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    currentLanguage: currentLanguageSelector,
    newspaper: createNewspaperByIdSelector(R.prop('newsId')),
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'newspaper',
  ], ({
    newspaper,
  }) => ({
    sliderNewspaper: {
      title: R.prop('title', newspaper),
      url: `/news/${transformUrl(newspaper)}`,
      image: getArticleImage(newspaper, 'standard'),
    },
  })),
)

export default container
