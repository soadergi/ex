import * as R from 'ramda'
import {
  compose, pure, withPropsOnChange,
} from 'recompose'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'

const container = compose(
  withRouteInfo,
  pure,
  withPropsOnChange([
    'rounds',
  ], ({
    rounds,
  }) => {
    const { doubleRoundIndexes } = rounds.reduce((accumulator, round, index) => {
      if (round.games.length === accumulator.prevRoundGamesLenght) {
        return {
          doubleRoundIndexes: accumulator.doubleRoundIndexes.concat(index),
          prevRoundGamesLenght: round.games.length,
        }
      }
      return {
        ...accumulator,
        prevRoundGamesLenght: round.games.length,
      }
    }, {
      doubleRoundIndexes: [],
      prevRoundGamesLenght: 0,
    })
    return ({
      // TODO: Sytneva to check if this is needed?
      hasFirstExtraRound: R.path(['0', 'games', 'length'], rounds) === R.path(['1', 'games', 'length'], rounds),
      doubleRoundIndexes,
      lastRoundIndex: rounds.length - 1,
    })
  }),
)

export default container
