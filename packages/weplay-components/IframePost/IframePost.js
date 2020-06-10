import React from 'react'
import PropTypes from 'prop-types'

const IframePost = ({ url }) => (
  <div id="content">
    <iframe
      title="linkedin post"
      src={url}
      height="500"
      width="100%"
      frameBorder="0"
    />
  </div>
)

export default React.memo(IframePost)

IframePost.propTypes = {
  url: PropTypes.string.isRequired,
}
