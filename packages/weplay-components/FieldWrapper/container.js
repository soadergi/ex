import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
  pure,
} from 'recompose'

const container = compose(
  pure,
  withPropsOnChange([
    // TODO this code is duplicated by Input container remove after FieldWrapper and Input refactoring
    'errors',
  ], (({
    errors,
  }) => ({
    hasError: !R.isNil(errors),
  }))),
)

export default container
