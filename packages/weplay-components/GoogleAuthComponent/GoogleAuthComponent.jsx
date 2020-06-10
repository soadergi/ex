import React from 'react'
import PropTypes from 'prop-types'
import Google from 'react-google-login'

const onFailure = () => {
  // TODO: Log to sentry - issue with google login
}
const GoogleAuthComponent = ({
  config,
  handleSuccess,
  children,
  className,
  style,
}) => (
  <Google
    clientId={config.clientId}
    onSuccess={handleSuccess}
    onFailure={onFailure}
    accessType={config.accessType}
    tag="label"
    type="none"
    className={className}
    style={style}
  >
    {children}
  </Google>
)

GoogleAuthComponent.propTypes = {
  handleSuccess: PropTypes.func.isRequired,
  config: PropTypes.shape({
    clientId: PropTypes.string.isRequired,
    accessType: PropTypes.string,
  }).isRequired,
  children: PropTypes.element.isRequired,
  className: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
}
GoogleAuthComponent.defaultProps = {
  style: null,
}

export default React.memo(GoogleAuthComponent)
