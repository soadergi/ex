import React from 'react'
import PropTypes from 'prop-types'
import FacebookAuthComponent from 'weplay-components/FacebookAuthComponent'

import container from './container'

const FacebookLogin = ({
  config,
  renderButton,
  handleCallback,
}) => (
  <FacebookAuthComponent
    config={config}
    renderButton={renderButton}
    handleCallback={handleCallback}
  />
)

FacebookLogin.propTypes = {
  config: PropTypes.shape({}).isRequired,
  handleCallback: PropTypes.func.isRequired,
  renderButton: PropTypes.func.isRequired,
}

export default container(FacebookLogin)
