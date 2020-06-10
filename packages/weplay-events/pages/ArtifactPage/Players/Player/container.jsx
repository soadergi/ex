import * as R from 'ramda'
import { compose, pure, withPropsOnChange } from 'recompose'

const container = compose(
  pure,
  withPropsOnChange([
    'player',
  ], ({
    player,
  }) => ({
    playerSocials: R.pipe(
      R.prop('social'),
      R.toPairs,
    )(player),
  })),
)

export default container
