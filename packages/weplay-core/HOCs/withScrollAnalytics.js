import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { compose } from 'recompose'
import * as R from 'ramda'

import routeInfoPropType from 'weplay-core/customPropTypes/routeInfoPropType'
import { NAMES } from 'weplay-core/routes'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import withScrollInfo from 'weplay-core/HOCs/withScrollInfo'
import { startCase } from 'weplay-core/helpers/cases'
import webAnalytics from 'weplay-core/services/webAnalytics'

const scrollPropNames = ['scrollTop', 'scrolledPercentWithStep25']
const points25 = [25, 50, 75, 100]
const withScrollAnalytics = (WrappedComponent) => {
  const HOC = class extends PureComponent {
    sentPercents = []

    // TODO: reset sentPercents if language is changed
    // TODO: when using on pages with dynamic segment should reset sentPercents when segemnt change
    componentDidUpdate(prevProps) {
      const { scrollTop, scrolledPercentWithStep25 } = this.props
      if (
        scrolledPercentWithStep25 > 0
        && prevProps.scrollTop !== scrollTop
        && prevProps.scrolledPercentWithStep25 !== scrolledPercentWithStep25
      ) {
        this.handleScrollChange(scrolledPercentWithStep25)
      }
    }

    handleScrollChange = (scrolledPercentWithStep25) => {
      const unsentPercents = this.getUnsentPercents(scrolledPercentWithStep25)
      if (!R.isEmpty(unsentPercents)) {
        // TODO: move WM suffix to code page name constant
        // ========== WM = WINTER MADNESS ==========
        const pageName = this.props.routeInfo.name === NAMES.CODES
          ? `${this.props.routeInfo.name}WM`
          : this.props.routeInfo.name
        // ========== WM = WINTER MADNESS ==========

        unsentPercents.forEach(unsentPercent => webAnalytics.sendScrollDepth({
          category: 'Scroll Depth',
          action: `${unsentPercent - 25}-${unsentPercent}`,
          label: `${startCase(pageName)} landing`,
        }))
        this.sentPercents = this.sentPercents.concat(unsentPercents)
      }
    }

    getUnsentPercents = scrolledPercentWithStep25 => R.pipe(
      R.indexOf(scrolledPercentWithStep25),
      indexOfPoint => points25.slice(0, indexOfPoint + 1),
      R.without(this.sentPercents),
    )(points25)

    render() {
      return (
        <WrappedComponent
          {...R.omit([...scrollPropNames, 'routeInfo'])(this.props)}
        />
      )
    }
  }

  HOC.propTypes = {
    routeInfo: routeInfoPropType.isRequired,
    scrollTop: PropTypes.number.isRequired,
    scrolledPercentWithStep25: PropTypes.oneOf([...points25, 0]).isRequired,
  }

  return HOC
}

const container = compose(
  withScrollInfo(scrollPropNames),
  withRouteInfo,
  withScrollAnalytics,
)

export default container
