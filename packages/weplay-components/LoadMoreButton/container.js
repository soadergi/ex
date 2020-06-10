import {
  pure,
  compose,
  branch,
  renderNothing,
} from 'recompose'

const container = compose(
  pure,
  branch(
    ({ isVisible }) => !isVisible,
    renderNothing,
  ),
)

export default container
