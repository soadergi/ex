import * as R from 'ramda'
import {
  compose,
  defaultProps,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import config from 'weplay-core/config'
import { transformUrl } from 'weplay-core/helpers/transformUrl'
import { originSelector } from 'weplay-core/reduxs/common/selectors'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    origin: originSelector,
  }), {
    // actionCreators
  }),

  defaultProps({
    type: '',
    pathname: '',
  }),

  withPropsOnChange([
    'origin',
    'articleTitles',
    'obj',
    'pathname',
    'type',
  ], ({
    origin,
    articleTitles,
    obj,
    pathname,
    type,
  }) => ({
    links: (articleTitles ? R.keys(articleTitles) : config.languages).map((language) => {
      const langPrefix = language === 'en' ? '' : `/${language}`
      const path = obj ? `/${transformUrl(obj, language, articleTitles)}` : pathname
      return {
        language,
        url: `${origin}${langPrefix}${type}${path}`,
      }
    }),
  })),
)

export default container
