import PropTypes from 'prop-types'

import { NOT_AVAILABLE } from 'weplay-competitive/constants/statistic/general'

const statisticItem = PropTypes.oneOfType([
  PropTypes.PropTypes.number,
  PropTypes.oneOf([NOT_AVAILABLE]),
])

export default PropTypes.shape({
  assistantsPerRound: statisticItem,
  deathPerRound: statisticItem,
  headshots: statisticItem,
  kDRatio: statisticItem,
  killsPerRound: statisticItem,
  mapsPlayed: statisticItem,
  matchPlayed: statisticItem,
  recentResults: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.oneOf([NOT_AVAILABLE]),
  ]),
  roundsPlayed: statisticItem,
  totalAssists: statisticItem,
  totalDeath: statisticItem,
  totalKills: statisticItem,
  winrate: statisticItem,
})
