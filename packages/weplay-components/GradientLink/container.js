import {
  compose,
  branch,
  renderNothing,
  pure,
} from 'recompose'

const container = compose(
  pure,
  branch(
    ({ to }) => !to,
    renderNothing,
  ),
)

export default container
