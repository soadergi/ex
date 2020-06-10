import React from 'react'
import PropTypes from 'prop-types'
import Facebook from 'react-facebook-login/dist/facebook-login-render-props'
import { useSelector } from 'react-redux'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

const FacebookAuthComponent = ({
  config,
  renderButton,
  handleCallback,
// window.opener is fix for https://weplay.dsgroup.mobi/jira/browse/WM-1080
}) => {
  const globalScope = useSelector(globalScopeSelector)
  return !globalScope.opener && (
    <Facebook
      appId={config.clientId}
      fields="name,email,picture"
      callback={handleCallback}
      responseType="code"
      disableMobileRedirect
      render={renderButton}
    />
  )
}

FacebookAuthComponent.propTypes = {
  handleCallback: PropTypes.func.isRequired,
  renderButton: PropTypes.func.isRequired,
  config: PropTypes.shape({
    clientId: PropTypes.string.isRequired,
  }).isRequired,
}

export default FacebookAuthComponent
