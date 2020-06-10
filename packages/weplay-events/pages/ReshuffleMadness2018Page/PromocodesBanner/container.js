import {
  compose,
  pure, withHandlers,
} from 'recompose'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { goTo, NAMES } from 'weplay-core/routes'

const container = compose(
  withRouter,
  pure,
  withHandlers({
    goToCodes: ({ history }) => () => goTo({
      name: NAMES.CODES,
      history,
    }),
  }),
)

export default container
