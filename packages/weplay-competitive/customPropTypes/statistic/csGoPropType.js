import PropTypes from 'prop-types'

export const scoreBoxCsGoPlayersPropType = PropTypes.shape({
  adr: PropTypes.number,
  assist: PropTypes.number,
  damage: PropTypes.number,
  death: PropTypes.number,
  headshots: PropTypes.number,
  headshotsRate: PropTypes.number,
  kDRatio: PropTypes.number,
  kill: PropTypes.number,
  killsPerRound: PropTypes.number,
  steamId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  memberId: PropTypes.number,
})

export const scoreBoxCsGoTeamsPropType = PropTypes.shape({
  CT: PropTypes.number,
  TERRORIST: PropTypes.number,
  name: PropTypes.string,
  score: PropTypes.number,
  players: PropTypes.arrayOf(scoreBoxCsGoPlayersPropType),
  teamId: PropTypes.number,
})

export default PropTypes.arrayOf(
  PropTypes.shape({
    duration: PropTypes.number,
    name: PropTypes.string,
    startedAt: PropTypes.number,
    score: PropTypes.shape({
      winner: PropTypes.number,
      teamsScore: PropTypes.arrayOf(
        PropTypes.number,
      ),
    }),
    teams: PropTypes.arrayOf(scoreBoxCsGoTeamsPropType),
  }),
)
