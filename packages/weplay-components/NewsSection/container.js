import * as R from 'ramda'
import {
  compose,
  branch,
  renderNothing,
  pure,
} from 'recompose'

const container = compose(
  pure,
  branch(
    ({ sourcesList }) => R.isNil(sourcesList) || R.isEmpty(sourcesList),
    renderNothing,
  ),
)

export default container
