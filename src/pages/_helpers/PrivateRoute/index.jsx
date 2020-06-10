import React from 'react'
import PropTypes from 'prop-types'
import {
  Redirect,
  Route,
} from 'react-router-dom'

const PrivateRoute = ({
  component: Component,
  currentUser,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (currentUser
      ? <Component {...props} />
      : <Redirect to="/" />
    )}
  />
)

PrivateRoute.propTypes = {
  currentUser: PropTypes.shape({}),
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({}),
  ]).isRequired,
}

PrivateRoute.defaultProps = {
  currentUser: null,
}

export default PrivateRoute
