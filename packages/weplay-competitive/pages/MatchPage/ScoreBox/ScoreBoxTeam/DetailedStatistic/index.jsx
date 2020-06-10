import React from 'react'
import PropTypes from 'prop-types'
import ScoreBoxPlayer from 'weplay-competitive/pages/MatchPage/ScoreBox/ScoreBoxPlayer'
import ScoreBoxTeamHeader from 'weplay-competitive/pages/MatchPage/ScoreBox/ScoreBoxTeamHeader'
import { scoreBoxDotaPlayerPropType } from 'weplay-competitive/customPropTypes/statistic/dotaPropType'
import { scoreBoxCsGoPlayersPropType } from 'weplay-competitive/customPropTypes/statistic/csGoPropType'

import container from './container'

const DetailedStatistic = ({
  // required props
  scoreBoxCells,
  // props from container
  team,

  // optional props
}) => (
  <table>
    <ScoreBoxTeamHeader scoreBoxCells={scoreBoxCells} />
    <tbody>
      {team.players.map(player => (
        player && (
        <ScoreBoxPlayer
          key={player.memberId}
          player={player}
          scoreBoxCells={scoreBoxCells}
        />
        )
      ))}
    </tbody>
  </table>
)

DetailedStatistic.propTypes = {
  // required props
  team: PropTypes.shape({
    players: PropTypes.arrayOf(
      PropTypes.oneOfType([
        scoreBoxCsGoPlayersPropType,
        scoreBoxDotaPlayerPropType,
      ]),
    ),
  }).isRequired,
  scoreBoxCells: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  // optional props

}

export default container(DetailedStatistic)
