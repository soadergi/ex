import {
  compose,
  withHandlers,
  pure,
} from 'recompose'
import PropTypes from 'prop-types'

const container = compose(
  pure,
  withHandlers({
    handleClick: ({ onClick, tab }) => () => onClick(tab),
  }),
)

container.propTypes = {
  onClick: PropTypes.func.isRequired,
}
export default container
