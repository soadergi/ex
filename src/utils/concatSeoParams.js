import * as R from 'ramda'

const concatSeoParams = obj => R.pipe(
  R.pathOr({}, []),
  R.pick(['firstName', 'lastName', 'nickName']),
  R.ifElse(
    names => (
      R.isEmpty(R.prop('firstName', names)) || R.isEmpty(R.prop('lastName', names))
    ),
    R.always(R.prop('nickName')),
    R.pipe(
      R.pick(['firstName', 'lastName']),
      R.values,
      R.join(' '),
    ),
  ),
)(obj)

export default concatSeoParams
