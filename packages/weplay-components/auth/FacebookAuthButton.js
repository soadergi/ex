import React from 'react'
import PropTypes from 'prop-types'

import withSocialLoginHandlers from 'weplay-core/HOCs/withSocialLoginHandlers'
import { useFacebookCallback } from 'weplay-core/hooks/auth/useFacebookCallback'

import FacebookAuthComponent from 'weplay-components/FacebookAuthComponent'
import Button, { BUTTON_COLOR } from 'weplay-components/Button'

const FacebookAuthButton = ({
  config,
  getSocialLoginSuccessHandler,
  getSocialErrorHandler,
  text,
  icon,
  className,
}) => {
  const handleCallback = useFacebookCallback(getSocialLoginSuccessHandler, getSocialErrorHandler)
  return (
    <FacebookAuthComponent
      config={config}
      renderButton={({ onClick: enableUserSocial }) => (
        <Button
          color={BUTTON_COLOR.FACEBOOK}
          onClick={enableUserSocial}
          icon={icon}
          className={className}
        >
          {text}
        </Button>
      )}
      handleCallback={handleCallback}
    />
  )
}

FacebookAuthButton.propTypes = {
  config: PropTypes.shape({}).isRequired,
  getSocialLoginSuccessHandler: PropTypes.func.isRequired,
  getSocialErrorHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}

export default withSocialLoginHandlers({
  socialErrorKey: 'socialNetworkUsedButNotLinked',
})(FacebookAuthButton)
