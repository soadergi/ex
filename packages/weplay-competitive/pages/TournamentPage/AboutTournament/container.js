import * as R from 'ramda'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import {
  compose,
  withPropsOnChange,
  withHandlers,
} from 'recompose'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

import withTabs from 'weplay-components/withTabs'

import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'
import { TOURNAMENT_RULE_LINKS } from 'weplay-competitive/constants/tournamentRuleLinks'
import { AT__TOURNAMENTS_DETAILS_RULES } from 'weplay-competitive/analytics/amplitude'
import { GA__READ_RULES } from 'weplay-competitive/analytics'
import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'

const container = compose(
  withLocale,
  withAnalytics,
  withDiscipline,
  connect(createStructuredSelector({
    globalScope: globalScopeSelector,
    getGameModeById: gameModesSelectors.getRecordByIdSelector,
  }), {
    // actionCreators
  }),
  withPropsOnChange([
    'tournament',
    'getGameModeById',
  ], ({
    tournament,
    getGameModeById,
  }) => ({
    tabs: R.keys(tournament.settings),
    gameModeTitle: R.pipe(
      R.path(['relationships', 'gameMode', 'id']),
      getGameModeById,
      R.prop('title'),
    )(tournament),
  })),
  withTabs,
  withHandlers({
    openRules: ({
      globalScope,
      logAnalytics,
      logAmplitude,
      gameModeTitle,
      locale,
      discipline,
    }) => () => {
      const rulesUrl = TOURNAMENT_RULE_LINKS[discipline][gameModeTitle][locale]
      logAnalytics(GA__READ_RULES)
      logAmplitude(AT__TOURNAMENTS_DETAILS_RULES, {
        Discipline: discipline,
      })
      globalScope.open(rulesUrl, '_blank')
    },
  }),
  withPropsOnChange([
    'tournament',
    't',
    'activeTab',
  ], ({
    tournament,
    t,
    activeTab,
  }) => {
    const lapSetting = R.path([activeTab], tournament.settings)

    return ({
      tournamentDetails: [
        // these three things are the same for each round
        {
          icon: 'stand-in',
          text: t('competitive.tournament.aboutTournament.label.standin'),
          value: tournament.reservedSize,
        },
        {
          icon: 'brackets',
          text: t('competitive.tournament.aboutTournament.label.bracket'),
          value: t(`competitive.tournaments.tournamentsTable.filters.options.brackets.${tournament.bracket}`),
        },
        {
          icon: 'thirdPlace',
          text: t('competitive.tournament.aboutTournament.label.thirdPlace'),
          value: t(`competitive.tournaments.tournamentsTable.filters.options.thirdPlaceMatch.${tournament.thirdPlaceMatch}`), // eslint-disable-line max-len
        },
        // these 4 things are different for each lap
        {
          icon: 'crown-blue',
          text: t('competitive.tournament.aboutTournament.label.voteFormat'),
          value: t(`competitive.tournaments.tournamentsTable.filters.options.voteFormats.${lapSetting.voteFormat}`),
        },
        {
          icon: 'schedule',
          text: t('competitive.tournament.aboutTournament.label.startDate'),
          value: lapSetting.startDate || 'ASAP',
        },
        {
          icon: 'votingTime',
          text: t('competitive.tournament.aboutTournament.label.voteTime'),
          value: lapSetting.voteTime,
        },
        {
          icon: 'bracket-logic',
          text: t('competitive.tournament.aboutTournament.label.bracketLogic'),
          value: t(`competitive.tournaments.tournamentsTable.filters.options.bracketLogic.${tournament.bracketLogic}`),
        },
      ],
    })
  }),
)

export default container
