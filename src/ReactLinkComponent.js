import React from 'react'
import * as PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'

const ReactLinkComponent = ({
  activeClassName,
  exact,
  ...props
}) => (activeClassName
  ? (
    <NavLink
      {...props}
      activeClassName={activeClassName}
      exact={Boolean(exact)}
    />
  )
  : <Link {...props} />
)

ReactLinkComponent.propTypes = {
  exact: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  activeClassName: PropTypes.string,
}
ReactLinkComponent.defaultProps = {
  exact: false,
  activeClassName: '',
}
export default ReactLinkComponent
