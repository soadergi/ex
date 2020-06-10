import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
  pure,
} from 'recompose'

const container = compose(
  pure,
  withPropsOnChange([
    'errors',
    'isTouched',
  ], ({
    errors,
    isTouched,
  }) => ({
    hasError: !R.isNil(errors) && isTouched,
  })),
)
container.defaultProps = {
  isTouched: false,
}
export default container
