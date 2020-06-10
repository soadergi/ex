import R from 'ramda'
import {
  compose,
  lifecycle,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { NAMES, goTo } from 'weplay-core/routes'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'

import withPreloader from 'weplay-components/withPreloader'

import {
  servicePageDataSelector,
  isServicePageLoadingSelector,
  isServicePageLoadingErrorSelector,
} from 'reduxs/legal/reducer'
import { getServicePage } from 'reduxs/legal/actions'

const container = compose(
  withLocale, // props: { locale, t }
  connect(createStructuredSelector({
    // selectors
    servicePageData: servicePageDataSelector,
    loading: isServicePageLoadingSelector,
    error: isServicePageLoadingErrorSelector,
  }), {
    // actionCreators
    getServicePage: getServicePage.request,
  }),

  withPageViewAnalytics(),

  withPropsOnChange([
    'servicePageData',
  ], ({
    servicePageData,
  }) => ({
    seoInfo: R.propOr({}, 'seo', servicePageData),
  })),

  lifecycle({
    componentDidMount() {
      const {
        match: {
          params: {
            legalName,
          },
        },
        locale,
      } = this.props

      this.props.getServicePage({
        language: locale,
        legalName,
      })
    },

    componentDidUpdate(prevProps) {
      const {
        history,
        match: {
          params: {
            legalName,
          },
        },
        error,
      } = this.props

      if (error) {
        goTo({
          history,
          name: NAMES.NOT_FOUND,
        })
      }

      if (prevProps.locale !== this.props.locale) {
        this.props.getServicePage({
          language: this.props.locale,
          legalName,
        })
      }
    },
  }),
  withPreloader({
    mapPropsToIsLoading: R.prop('loading'),
    isFullScreen: true,
  }),
)

export default container
