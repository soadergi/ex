import * as R from 'ramda'
import React, { PureComponent } from 'react'
import { compose } from 'recompose'

import { startCase } from 'weplay-core/helpers/cases'
import routeInfoPropType from 'weplay-core/customPropTypes/routeInfoPropType'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import webAnalytics, { FORM_EVENT } from 'weplay-core/services/webAnalytics'

const withAnalytics = (WrappedComponent) => {
  const HOC = class extends PureComponent {
    logAnalytics = (params) => {
      if (R.propEq('event', FORM_EVENT, params)) {
        webAnalytics.sendFormEvent(params)
      } else {
        webAnalytics.sendGeneralEvent(params)
      }
    }

    render() {
      return (
        <WrappedComponent
          logAnalytics={this.logAnalytics}
          pushAnalEvent={webAnalytics.pushEvent}
          logAmplitude={webAnalytics.sendAmplitudeEvent}
          setAmplitudeCustomProperty={webAnalytics.setAmplitudeCustomProperty}
          setAmplitudeUserId={webAnalytics.setAmplitudeUserId}
          startcasePageName={startCase(this.props.routeInfo.name)}
          {...this.props}
        />
      )
    }
  }
  HOC.propTypes = {
    routeInfo: routeInfoPropType.isRequired,
  }
  return HOC
}

const container = compose(
  withRouteInfo,
  withAnalytics,
)

export default container
