import * as R from 'ramda'
import {
  compose,
  pure,
  branch,
  renderNothing,
} from 'recompose'

const container = compose(
  pure,
  branch(
    ({ links }) => R.isNil(links),
    renderNothing,
  ),
)

export default container
