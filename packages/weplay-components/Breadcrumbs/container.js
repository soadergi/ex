import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
} from 'recompose'
import PropTypes from 'prop-types'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import breadcrumbPropType from 'weplay-core/customPropTypes/breadcrumbPropType'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'

const container = compose(
  withRouteInfo,
  withLocale,

  withPropsOnChange([
    't',
    'additionalBreadCrumbs',
    'allBreadcrumbs',
    'entityName',
    'location',
  ], ({
    t,
    additionalBreadCrumbs,
    allBreadcrumbs,
    entityName,
    location,
  }) => ({
    // TODO: @ILLIA create breadcrumbs structure which depends on pageInfo
    breadcrumbs: allBreadcrumbs
      || R.reduce(R.concat, [],
        [
          [{ name: 'WePlay!', path: '/' }],
          [{ name: t('headerTitle.media'), path: '/media' }],
          additionalBreadCrumbs || [],
          [{
            name: entityName,
            path: location.pathname,
          }],
        ]),
  })),
)

container.propTypes = {
  additionalBreadCrumbs: PropTypes.arrayOf(breadcrumbPropType),
}

export default container
