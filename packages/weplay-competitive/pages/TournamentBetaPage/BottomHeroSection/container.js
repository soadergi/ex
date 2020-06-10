import {
  compose,
  withProps,
  withHandlers,
} from 'recompose'
import * as R from 'ramda'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'

import { DISCIPLINES } from 'weplay-competitive/config/disciplines'

const container = compose(
  withAnalytics,
  withProps(() => ({
    disciplines: R.values(DISCIPLINES),
  })),

  withHandlers({
    handleLinkClick: ({ handleDisciplineClick }) => () => {
      handleDisciplineClick()
    },
  }),
)

export default container
