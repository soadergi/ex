import * as R from 'ramda'
import {
  compose, pure, withProps, withPropsOnChange,
} from 'recompose'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { DISCIPLINES } from 'weplay-competitive/config/disciplines'

const withDiscipline = compose(
  withRouter,
  pure,
  withProps(({
    match,
  }) => ({
    discipline: R.pathOr('', ['params', 'discipline'], match),
  })),
  withPropsOnChange([
    'discipline',
  ], ({
    discipline,
  }) => ({
    tournamentDiscipline: DISCIPLINES[discipline],
    disciplineName: DISCIPLINES[discipline]?.name ?? '',
  })),
)

export default withDiscipline
