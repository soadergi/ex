import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { originSelector } from 'weplay-core/reduxs/common/selectors'
import { currentLanguagePrefixSelector } from 'weplay-core/reduxs/language/reducer'

const socialIconNamesMap = {
  twitter: 'twitter',
  reddit: 'reddit',
  facebook: 'facebook',
  telegram: 'telegramMedia',
  vk: 'vk',
}

const container = compose(
  withRouter,
  connect(createStructuredSelector({
    // selectors
    origin: originSelector,
    currentLanguagePrefix: currentLanguagePrefixSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'url',
    'origin',
    'location',
    'social',
    'currentLanguagePrefix',
  ], ({
    url,
    origin,
    location,
    social,
    currentLanguagePrefix,
  }) => ({
    shareUrl: url
      ? `${origin}${currentLanguagePrefix}${url}`
      : `${origin}${R.prop('pathname', location)}`,
    iconName: socialIconNamesMap[social],
  })),
)

export default container
