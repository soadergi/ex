import React from 'react'
import PropTypes from 'prop-types'

import container from './container'
import NotConnectedLink from './NotConnectedLink'

const Link = ({
  locale,
  setMessages,
  setLocale,
  ...props
}) => (
  <NotConnectedLink
    {...props}
    locale={locale}
  />
)

Link.propTypes = {
  locale: PropTypes.string.isRequired,
  setMessages: PropTypes.func.isRequired,
  setLocale: PropTypes.func.isRequired,
}

Link.defaultProps = {
}
export default container(Link)
