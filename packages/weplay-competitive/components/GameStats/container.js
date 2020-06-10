import * as R from 'ramda'
import {
  compose,
  withProps,
  pure,
} from 'recompose'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { NOT_AVAILABLE } from 'weplay-competitive/constants/statistic/general'
import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'

const RECENT_RESULTS = 'recentResults'
const WINRATE = 'winrate'

const STREAK = {
  loose: {
    code: 0,
    symbol: 'L',
  },
  win: {
    code: 1,
    symbol: 'W',
  },
}

const makeStreakResult = result => (result === STREAK.loose.code ? STREAK.loose.symbol : STREAK.win.symbol)
const nameMaxLength = 3
const container = compose(
  withLocale,
  pure,
  withDiscipline,
  withProps(
    ({
      statistic,
      t,
      tournamentDiscipline,
    }) => {
      const indicators = tournamentDiscipline.statistic.statisticGame.map((statisticItem) => {
        let value
        const statisticValue = statistic[statisticItem.name]

        switch (statisticItem.name) {
          case WINRATE:
            value = statistic[WINRATE] === NOT_AVAILABLE
              ? value = statisticValue
              : value = `${statisticValue} %`
            break
          case RECENT_RESULTS:
            value = statistic[RECENT_RESULTS] === NOT_AVAILABLE
              ? statisticValue
              : R.pipe(
                R.propOr([], statisticItem.name),
                R.slice(0, nameMaxLength),
                R.map(makeStreakResult),
                R.join(', '),
                streak => (R.isEmpty(streak) ? NOT_AVAILABLE : streak),
              )(statistic)
            break
          default:
            value = statisticValue
        }

        return {
          id: statisticItem.name,
          icon: statisticItem.icon,
          title: t(`competitive.member.tournamentSection.${tournamentDiscipline.statistic.name}.gameStats.${statisticItem.name}`), // eslint-disable-line
          value,
        }
      })

      return {
        indicators,
      }
    },
  ),
)

export default container
