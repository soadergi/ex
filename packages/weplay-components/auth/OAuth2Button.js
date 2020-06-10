import React from 'react'
import PropTypes from 'prop-types'

import { useOAuth2Handler } from 'weplay-core/hooks/auth/useOAuth2Handler'

import Button from 'weplay-components/Button'

const OAuth2Button = ({
  // required props
  config,
  text,
  // container props
  // optional props
  ...rest
}) => {
  const handleClick = useOAuth2Handler(config)
  return (
    <Button
      onClick={handleClick}
      {...rest}
    >
      {text}
    </Button>
  )
}

OAuth2Button.propTypes = {
  // required props
  config: PropTypes.shape({}).isRequired,
  text: PropTypes.string.isRequired,
  // container props
  // optional props
}

OAuth2Button.defaultProps = {
  // optional props
}

export default OAuth2Button
