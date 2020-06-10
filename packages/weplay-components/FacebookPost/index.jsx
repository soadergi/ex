import React from 'react'
import PropTypes from 'prop-types'
import { EmbeddedPost, FacebookProvider } from 'react-facebook'
import { facebookAppId } from 'weplay-core/config'

import container from './container'

export const FacebookPostMarkup = ({
  // required props
  postUrl,

  // container props

  // optional props
}) => (
  <FacebookProvider
    appId={facebookAppId}
  >
    <EmbeddedPost
      href={postUrl}
      width="auto"
    />
  </FacebookProvider>
)

FacebookPostMarkup.propTypes = {
  // required props
  postUrl: PropTypes.string.isRequired,

  // container props

  // optional props
}

FacebookPostMarkup.defaultProps = {
  // optional props
}

export default container(FacebookPostMarkup)
