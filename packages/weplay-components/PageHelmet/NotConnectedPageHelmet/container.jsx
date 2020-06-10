import {
  compose,
  defaultProps,
  setPropTypes,
  withPropsOnChange,
} from 'recompose'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { localizeWith } from 'weplay-core/reduxs/helpers'
import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

const container = compose(
  setPropTypes({
    subPageName: PropTypes.string,
  }),

  defaultProps({
    subPageName: 'default',
  }),
  withLocale,

  withPropsOnChange([
    'routeInfo',
    'location',
    'globalScope',
    'seoInfo',
    'locale',
  ], ({
    routeInfo,
    location,
    globalScope,
    seoInfo,
    locale,
  }) => ({
    pageName: R.propOr('media', 'name', routeInfo),
    // TODO: @BACKEND, need to use the same values by noindex at all Services!
    isNoindex: R.and(
      Boolean(R.prop('noindex', seoInfo)),
      Boolean(R.prop('noindex', seoInfo) !== '0'),
    ),
    // we need to use canonical urls without any params except pages with pagination
    isCanonical: !R.test(/\?page-/, location.search),
    canonicalUrl: `${globalScope.origin}${location.pathname}`,
    hasSeoScript: !R.isNil(R.prop('script', seoInfo)),
    seoScript: R.pipe(
      localizeWith(locale),
      R.prop('script'),
      R.defaultTo({}),
      script => JSON.stringify(script, null, 2),
    )(seoInfo),
  })),
)

export default container
