import React from 'react'
import PropTypes from 'prop-types'
import IsomorphicHead from 'weplay-components/IsomorphicHead'

import container from './container'

const HrefLangLink = ({
  // required props
  // container props
  links,
}) => links.map(link => (
  <IsomorphicHead key={link.language}>
    <link
      rel="alternate"
      hrefLang={link.language}
      href={link.url}
    />
  </IsomorphicHead>
))

HrefLangLink.propTypes = {
  // required props
  // container props
  links: PropTypes.arrayOf(PropTypes.shape({
    language: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
}

export default container(HrefLangLink)
