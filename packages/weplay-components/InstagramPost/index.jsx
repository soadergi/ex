import React from 'react'
import PropTypes from 'prop-types'
import InstagramEmbed from 'react-instagram-embed'

const InstagramPost = props => (
  <div id="content">
    <InstagramEmbed
      url={props.url}
      hideCaption={false}
    />
  </div>
)

export default (InstagramPost)

InstagramPost.propTypes = {
  url: PropTypes.string.isRequired,
}
