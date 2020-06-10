import PropTypes from 'prop-types'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'

export default PropTypes.shape({
  avatar: imgPropType,
  name: PropTypes.string,
  subtitle: PropTypes.string,
  kill: PropTypes.number.isRequired,
  assist: PropTypes.number.isRequired,
  death: PropTypes.number.isRequired,
  killsPerRound: PropTypes.number.isRequired,
  kDRatio: PropTypes.number.isRequired,
  headshots: PropTypes.number.isRequired,
  headshotsRate: PropTypes.number.isRequired,
  mvp: PropTypes.string,
})
