import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'

import GoogleAuthComponent from 'weplay-components/GoogleAuthComponent/GoogleAuthComponent'

import SocialButton from '../SocialAccount/SocialButton'

import container from './container'

const styleResetting = { width: '100%' }

const GoogleAccountLink = ({
  config,
  isActive,
  disableUserSocial,
  handleSuccess,
}) => (
  <>
    {isActive
      ? (
        <SocialButton
          isActive
          config={config}
          disableUserSocial={disableUserSocial}
          enableUserSocial={R.identity}
        />
      )
      : (
        <GoogleAuthComponent
          config={config}
          handleSuccess={handleSuccess}
          style={styleResetting}
        >
          <SocialButton
            isActive={false}
            config={config}
            enableUserSocial={R.identity}
          />
        </GoogleAuthComponent>
      )}
  </>
)

GoogleAccountLink.propTypes = {
  disableUserSocial: PropTypes.func.isRequired,
  config: PropTypes.shape({}).isRequired,
  isActive: PropTypes.bool.isRequired,
  handleSuccess: PropTypes.func.isRequired,
}

export default container(GoogleAccountLink)
