import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
  withProps,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { i18nTextsSelector, currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'
import webAnalytics from 'weplay-core/services/webAnalytics'
import { createBannersByTypeSelector } from 'weplay-media/reduxs/banners/reducer'
import { getBannerAccessKey } from 'weplay-media/reduxs/banners/actions'
import { BANNERS_FORMATS } from 'weplay-media/reduxs/banners/constants'

const container = compose(
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    currentLanguage: currentLanguageSelector,
    banners: createBannersByTypeSelector(BANNERS_FORMATS.EVENT),
  }), {
    postAccessKey: getBannerAccessKey.request,
  }),

  withPropsOnChange([
    'banners',
  ], ({
    banners,
  }) => ({
    banner: banners[0],
  })),

  withPropsOnChange([
    'banner',
  ], ({
    banner,
  }) => (
    R.pipe(
      R.propOr([], 'media'),
      R.map(
        R.pipe(
          R.pick(['handlerName', 'path']),
          R.values,
        ),
      ),
      R.fromPairs,
      camelizeKeys,
    )(banner)
  )),

  withPropsOnChange([
    'bannerEventBackground',
    'banner',
    'isStreamAvailable',
  ], ({
    bannerEventBackground,
    banner,
    isStreamAvailable, // TODO: @Andrew, use withStreams instead of this selector
  }) => ({
    bannerBackground: { backgroundImage: `url(${bannerEventBackground})` },
    textColor: { color: R.propOr('', 'textColor', banner) },
    isLive: isStreamAvailable,
  })),

  withProps(({
    banner,
  }) => ({
    text: R.propOr('', 'text', banner),
    title: R.propOr('', 'title', banner),
    bannerTextSecondOpt: R.propOr('', 'bannerTextSecondOpt', banner),
    buttonTextSecondOpt: R.propOr('', 'buttonTextSecondOpt', banner),
    buttonText: R.propOr('', 'callToActionText', banner),
    accessKey: R.prop('accessKey', banner),
  })),

  withHandlers({
    handleClick: ({
      accessKey,
      postAccessKey,
      title,
    }) => () => {
      webAnalytics.sendGeneralEvent({
        eventCategory: title,
        eventAction: 'Watch now',
      })
      postAccessKey(accessKey)
    },
  }),
)

export default container
