import PropTypes from 'prop-types'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  isShowInGamesProfile: PropTypes.bool.isRequired,
  gameSteamId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  shortName: PropTypes.string,
  backgrounds: PropTypes.shape({
    mainTournamentsPage: imgPropType.isRequired,
    iconTournamentsPage: imgPropType.isRequired,
    iconMemberPage: imgPropType.isRequired,
    defaultTournamentCard: imgPropType,
    heroSectionButton: imgPropType,
    logo: imgPropType,
  }),
  icons: PropTypes.shape({
    iconName: PropTypes.string.isRequired,
    iconStyle: PropTypes.string.isRequired,
  }),
  access: PropTypes.shape({
    type: PropTypes.string.isRequired,
    params: PropTypes.arrayOf(PropTypes.string),
  }),
  url: PropTypes.string.isRequired,
  statistic: PropTypes.shape({
    name: PropTypes.string.isRequired,
    performanceNames: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.arrayOf(PropTypes.string),
    })),
    statisticGame: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string,
    })),
    roleSelectOptions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
    scoreBox: PropTypes.shape({
      head: PropTypes.arrayOf(PropTypes.shape({})),
      body: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
  pool: PropTypes.string,
  runCommand: PropTypes.string,
  discord: PropTypes.shape({
    en: PropTypes.string.isRequired,
    ru: PropTypes.string.isRequired,
  }),
  challonge: PropTypes.shape({
    responseGameName: PropTypes.string,
  }),
})
