import { compose, pure, withHandlers } from 'recompose'
import PropTypes from 'prop-types'

const container = compose(
  pure,
  withHandlers({
    handleClick: ({
      isActive,
      disableUserSocial,
      enableUserSocial,
      config,
    }) => () => (isActive ? disableUserSocial(config.source) : enableUserSocial()),
  }),
)

container.propTypes = {
  config: PropTypes.shape({}).isRequired,
  disableUserSocial: PropTypes.func.isRequired,
  enableUserSocial: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
}

container.defaultProps = {
  isActive: false,
}
export default container
