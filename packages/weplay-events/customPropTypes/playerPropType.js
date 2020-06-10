import PropTypes from 'prop-types'

const relationshipEntityShape = PropTypes.shape({
  id: PropTypes.string,
  type: PropTypes.string,
})

export default PropTypes.shape({
  isFetched: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  isInvited: PropTypes.bool.isRequired,
  nickname: PropTypes.string.isRequired,
  createDatetime: PropTypes.string.isRequired,
  updateDatetime: PropTypes.string.isRequired,
  relationships: PropTypes.shape({
    tournamentTeam: relationshipEntityShape,
    player: relationshipEntityShape,
    tournament: relationshipEntityShape,
  }).isRequired,
  accounts: PropTypes.shape({
    steam: PropTypes.string,
  }),
  socialNetworks: PropTypes.shape({
    twitter: PropTypes.string,
    facebook: PropTypes.string,
    twitch: PropTypes.string,
  }),
  birthDate: PropTypes.string,
  surname: PropTypes.string,
  logoUrl: PropTypes.string,
  role: PropTypes.string,
})
