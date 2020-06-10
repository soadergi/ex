import PropTypes from 'prop-types'

export const scoreBoxDotaPlayerPropType = PropTypes.shape({
  kills: PropTypes.number,
  assists: PropTypes.number,
  deaths: PropTypes.number,
  lastHits: PropTypes.number,
  denies: PropTypes.number,
  goldPerMin: PropTypes.number,
  xpPerMin: PropTypes.number,
  heroDamage: PropTypes.number,
  towerDamage: PropTypes.number,
  heroHealing: PropTypes.string,
  steamId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  memberId: PropTypes.number,
})

export const scoreBoxDotaTeamsPropType = PropTypes.shape({
  score: PropTypes.number,
  side: PropTypes.number,
  players: PropTypes.arrayOf(scoreBoxDotaPlayerPropType),
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
    teams: PropTypes.arrayOf(scoreBoxDotaTeamsPropType),
  }),
)
