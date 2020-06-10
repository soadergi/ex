import * as R from 'ramda'
import {
  compose, pure,
  withPropsOnChange,
} from 'recompose'

const container = compose(
  pure,
  withPropsOnChange([
    'menu',
  ], ({
    menu,
  }) => ({
    hasSubMenu: R.has('submenu', R.head(menu)),
  })),
)

export default container
