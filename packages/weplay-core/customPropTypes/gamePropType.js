import PropTypes from 'prop-types'

const localizationPropType = PropTypes.shape({
  en: PropTypes.string,
  ru: PropTypes.string,
})

export default PropTypes.shape({
  startDatetime: PropTypes.string.isRequired,
  players: PropTypes.shape({
    a: PropTypes.shape({
      nickname: PropTypes.string,
      score: PropTypes.number,
    }),
    b: PropTypes.shape({
      nickname: PropTypes.string,
      score: PropTypes.number,
    }),
  }),
  urls: PropTypes.arrayOf(
    PropTypes.shape({
      highlights: localizationPropType,
      news: localizationPropType,
      stats: localizationPropType,
      twitchClips: localizationPropType,
    }),
  ),
})
