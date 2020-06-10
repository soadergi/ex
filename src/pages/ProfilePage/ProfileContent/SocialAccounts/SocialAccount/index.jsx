import React from 'react'
import PropTypes from 'prop-types'

import container from './container'
import SocialButton from './SocialButton'

const SocialAccount = ({
  config, handleOpenAuthPopup, isActive, disableUserSocial,
}) => (
  <SocialButton
    enableUserSocial={handleOpenAuthPopup}
    disableUserSocial={disableUserSocial}
    config={config}
    isActive={isActive}
  />
)

SocialAccount.propTypes = {
  config: PropTypes.object.isRequired,
  handleOpenAuthPopup: PropTypes.func.isRequired,
  disableUserSocial: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
}

SocialAccount.defaultProps = {
  isActive: false,
}

export default container(SocialAccount)
