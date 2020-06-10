import PropTypes from 'prop-types'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'

export default PropTypes.shape({
  avatar: imgPropType,
  name: PropTypes.string,
  status: PropTypes.string,
  bracket: PropTypes.string,
  details: PropTypes.arrayOf(PropTypes.string),
  isFetched: PropTypes.bool,

  totalSlots: PropTypes.number,
  emptySlots: PropTypes.number,
  lang: PropTypes.shape({
    ru: PropTypes.shape({}),
    en: PropTypes.shape({}),
  }),
  prizePool: PropTypes.number,
  // TODO: @illia ask BE
  prize: PropTypes.string,
  reglament: PropTypes.shape({}),
  reservedSize: PropTypes.number,
  thirdPlaceMatch: PropTypes.number,

  closeRegistrationDatetime: PropTypes.string,
  openRegistrationDatetime: PropTypes.string,
  publishDatetime: PropTypes.string,
  startDatetime: PropTypes.string,
  updateDatetime: PropTypes.string,
  createDatetime: PropTypes.string,

  settings: PropTypes.shape({
    qualification: PropTypes.shape({
      voteFormat: PropTypes.string.isRequired,
      votePool: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ]),
      ).isRequired,
      voteTime: PropTypes.number.isRequired,
      voteVetoLogic: PropTypes.string.isRequired,
    }),
  }),
})
