import R from 'ramda'
import {
  compose,
  withProps,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'

import { createBannerByTypeSelector } from 'weplay-media/reduxs/banners/reducer'
import { getBannerAccessKey } from 'weplay-media/reduxs/banners/actions'
import { BANNERS_FORMATS } from 'weplay-media/reduxs/banners/constants'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    banner: createBannerByTypeSelector(BANNERS_FORMATS.SMALL_TOP),
    currentLanguage: currentLanguageSelector,
  }), {
    // actionCreators
    postAccessKey: getBannerAccessKey.request,
  }),

  withPropsOnChange([
    'banner',
  ], ({
    banner,
  }) => ({
    bannerBackground: { backgroundImage: `url(${R.path(['media', '0', 'path'], banner)})` },
    textColor: { color: R.propOr('', 'textColor', banner) },
  })),

  withProps(({
    banner,
  }) => ({
    text: R.propOr('', 'text', banner),
    buttonText: R.propOr('', 'callToActionText', banner),
    accessKey: R.propOr('', 'accessKey', banner),
  })),

  withHandlers({
    handleClick: ({
      accessKey,
      postAccessKey,
    }) => () => {
      postAccessKey(accessKey)
    },
  }),
)

export default container
