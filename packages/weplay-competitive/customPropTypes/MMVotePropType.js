import PropTypes from 'prop-types'

import MMVoteItemPropType from './MMVoteItemPropType'

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  period: PropTypes.number.isRequired,
  teamLeft: PropTypes.arrayOf(
    PropTypes.number,
  ).isRequired,
  teamRight: PropTypes.arrayOf(
    PropTypes.number,
  ).isRequired,
  status: PropTypes.string.isRequired,
  strategy: PropTypes.string.isRequired,
  serverPick: PropTypes.number.isRequired,
  voteItems: PropTypes.arrayOf(MMVoteItemPropType).isRequired,
})
