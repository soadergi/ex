import React from 'react'
import PropTypes from 'prop-types'
import IsomorphicHead from 'weplay-components/IsomorphicHead'

import container from './container'

const VirtualPagination = ({
  // required props
  hasMore,
  pageNum,
  // container props
  prevLink,
  nextLink,
}) => (
  <IsomorphicHead>
    {hasMore && (
      <link
        rel="next"
        href={nextLink}
      />
    )}
    {pageNum > 1 && (
      <link
        rel="prev"
        href={prevLink}
      />
    )}
    {pageNum > 1 && (
      <meta
        name="robots"
        content="noindex, follow"
      />
    )}
  </IsomorphicHead>
)

VirtualPagination.propTypes = {
  // required props
  hasMore: PropTypes.bool.isRequired,
  pageNum: PropTypes.number.isRequired,
  // container props
  prevLink: PropTypes.string.isRequired,
  nextLink: PropTypes.string.isRequired,
}

export default container(VirtualPagination)
