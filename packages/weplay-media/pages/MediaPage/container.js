import { connect } from 'react-redux'
import {
  compose,
  lifecycle,
  withProps,
} from 'recompose'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import { isTabletWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { getSections } from 'weplay-core/reduxs/sections/actions'
import {
  sectionsLoadingSelector,
  sectionsIsInitialStateSelector,
  popularIdsSelector,
  latestIdsSelector,
} from 'weplay-core/reduxs/sections/reducer'

import withPreloader from 'weplay-components/withPreloader'
import withServerRender from 'weplay-components/withServerRender'

import { getInitialData } from './actionChains'

const container = compose(
  withLocale,
  connect(createStructuredSelector({
    loading: sectionsLoadingSelector,
    sectionsIsEmpty: sectionsIsInitialStateSelector,
    popularIds: popularIdsSelector,
    latestIds: latestIdsSelector,
    isTabletWidth: isTabletWidthSelector,
  }), {
    getSections: getSections.request,
  }),

  withServerRender(getInitialData),
  withPageViewAnalytics(),

  withPreloader({
    isFullScreen: true,
    mapPropsToIsLoading(props) {
      return props.loading && props.sectionsIsEmpty
    },
  }),

  withProps({
    ogImage: 'https://static-prod.weplay.tv/2019-10-02/e40ffbd663d51248c3eb2a2681737e90.jpeg',
  }),

  lifecycle({
    componentDidUpdate(prevProps) {
      const {
        locale,
        getInitialData, // eslint-disable-line no-shadow
      } = this.props

      if (locale !== prevProps.locale) {
        getInitialData({ locale })
      }
    },
  }),
)

export default container
