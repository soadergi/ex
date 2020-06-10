import React from 'react'
import PropTypes from 'prop-types'
import Link from 'weplay-components/Link'

const LinkWrapper = ({
  to,
  children,
  ...props
}) => (
  to
    ? (
      <Link
        to={to}
        {...props}
      >
        {children}
      </Link>
    )
    : children
)

LinkWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
}

LinkWrapper.defaultProps = {
  to: '',
}
export default LinkWrapper
