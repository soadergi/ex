import React from 'react'

import NotConnectedPageHelmet from './NotConnectedPageHelmet'
import container from './container'

const PageHelmet = props => (
  <NotConnectedPageHelmet {...props} />
)

PageHelmet.propTypes = {
}

PageHelmet.defaultProps = {
}

export default container(PageHelmet)
