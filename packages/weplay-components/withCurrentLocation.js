import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import historyPropType from 'weplay-core/customPropTypes/historyPropType'
import { originSelector } from 'weplay-core/reduxs/common/selectors'

const withCurrentLocation = (WrappedComponent) => {
  const HOC = class extends PureComponent {
    render() {
      const {
        history,
        match,
        origin,
        ...restProps
      } = this.props
      const currentLocation = `${origin}${history.location.pathname}${history.location.search}`

      return (
        <WrappedComponent
          {...restProps}
          currentLocation={currentLocation}
          history={history}
          match={match}
        />
      )
    }
  }
  HOC.propTypes = {
    history: historyPropType.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}).isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
    origin: PropTypes.string.isRequired,
  }

  return HOC
}

const container = compose(
  withRouter,
  connect(createStructuredSelector({
    // selectors
    origin: originSelector,
  }), {
    // actionCreators
  }),
  withCurrentLocation,
)

export default container
