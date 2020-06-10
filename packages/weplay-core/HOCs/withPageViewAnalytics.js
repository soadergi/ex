import _ from 'lodash'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import { compose } from 'recompose'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import routeInfoPropType from 'weplay-core/customPropTypes/routeInfoPropType'
import { userIdSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import webAnalytics from 'weplay-core/services/webAnalytics'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'

// TODO: @Andrew, remove this HOC everywhere and use general solution in main Configurator
const withPageViewAnalytics = paramsMapper => (WrappedComponent) => {
  const HOC = class extends PureComponent {
    constructor(props) {
      super(props)
      this.isDynamicContent = typeof paramsMapper === 'function'
      this.paramsList = Object.keys(this.isDynamicContent ? paramsMapper(props) : {})
      this.state = {
        isPageViewSent: false,
      }
    }

    componentDidMount() {
      this.handlePageView()
    }

    componentDidUpdate(prevProps) {
      if (this.isDynamicContent) {
        this.listenParamsUpdate(prevProps)
        this.handlePageView()
        return
      }

      if (prevProps.locale !== this.props.locale) {
        this.logPageView(this.getParams())
      }
    }

    getParams = () => {
      if (this.isDynamicContent) {
        return paramsMapper(this.props)
      }
      if (typeof paramsMapper === 'object') {
        return paramsMapper
      }
      return null
    }

    isParamsFulfilled = (params) => {
      let isFulfilled = true
      R.forEachObjIndexed(R.ifElse(
        param => R.isNil(param) || R.isEmpty(param),
        () => { isFulfilled = false },
        R.identical,
      ), params)
      return isFulfilled
    }

    listenParamsUpdate = (prevProps) => {
      const prevParams = paramsMapper(prevProps)
      const nextParams = paramsMapper(this.props)
      if (prevProps.locale !== this.props.locale) {
        this.setState({ isPageViewSent: false })
        return
      }
      R.forEach((param) => {
        if (!R.equals(prevParams[param], nextParams[param])) {
          this.setState({ isPageViewSent: false })
        }
      }, this.paramsList)
    }

    handlePageView = () => {
      const params = this.getParams()
      if (this.isParamsFulfilled(params) && !this.state.isPageViewSent) {
        this.logPageView(params)
        this.setState({ isPageViewSent: true })
      }
    }

    logPageView = (additionalParams) => {
      webAnalytics.sendPageView({
        pageType: `${_.capitalize(this.props.routeInfo.name)}Page`,
        userAuth: Number(Boolean(this.props.userId)),
        ...Boolean(this.props.userId) && {
          userId: this.props.userId,
        },
        ...additionalParams,
      })
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
        />
      )
    }
  }

  HOC.propTypes = {
    userId: PropTypes.number,
    locale: PropTypes.string.isRequired,
    routeInfo: routeInfoPropType.isRequired,
  }

  HOC.defaultProps = {
    userId: null,
  }

  return HOC
}

const container = paramsMapper => compose(
  withLocale,
  connect(createStructuredSelector({
    // selectors
    userId: userIdSelector,
  }), {
    // actionCreators
  }),
  withAnalytics,
  withPageViewAnalytics(paramsMapper),
)

export default container
