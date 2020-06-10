import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'

import container from './container'

export const LazyDivMarkup = ({
  // required props
  children,
  // container props
  // optional props
  ...props
}) => (
  <>
    <LazyLoad
      once
      offset={400}
      {...props}
    >
      {children}
    </LazyLoad>
    <noscript>
      <style>{'.lazyload-placeholder { display: none; }'}</style>
      {children}
    </noscript>
  </>
)

LazyDivMarkup.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
  // container props
  // optional props
}

LazyDivMarkup.defaultProps = {
  // optional props
}

export default container(LazyDivMarkup)
