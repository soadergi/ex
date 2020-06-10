import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'

import FacebookAuthComponent from 'weplay-components/FacebookAuthComponent'

import SocialButton from '../SocialAccount/SocialButton'

import container from './container'

const FacebookAccountLink = ({
  config,
  isActive,
  disableUserSocial,
  handleCallback,
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
        <FacebookAuthComponent
          config={config}
          handleCallback={handleCallback}
          renderButton={({ onClick: enableUserSocial }) => (
            <SocialButton
              isActive={false}
              config={config}
              enableUserSocial={enableUserSocial}
            />
          )}
        />
      )}
  </>
)

FacebookAccountLink.propTypes = {
  disableUserSocial: PropTypes.func.isRequired,
  config: PropTypes.shape({}).isRequired,
  isActive: PropTypes.bool.isRequired,
  handleCallback: PropTypes.func.isRequired,
}

export default container(FacebookAccountLink)
