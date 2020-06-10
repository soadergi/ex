import PropTypes from 'prop-types'

import { getGeneralFields } from 'weplay-competitive/customPropTypes/teamPropType'

export default PropTypes.shape({
  ...getGeneralFields('Member'),

  joinDatetime: PropTypes.string,
  country: PropTypes.string,
  userGames: PropTypes.arrayOf(PropTypes.shape({
    gameId: PropTypes.number,
    gamePlatformType: PropTypes.string,
    name: PropTypes.string,
  })),
})
