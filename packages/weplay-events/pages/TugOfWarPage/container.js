import * as R from 'ramda'
import {
  compose,
  withProps,
  withPropsOnChange,
  withHandlers,
  lifecycle,
} from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import {
  currentLanguagePrefixSelector,
  i18nTextsSelector,
  currentLanguageSelector,
} from 'weplay-core/reduxs/language/reducer'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'

import { TUG_OF_WAR_STAGE_NAMES } from 'weplay-events/pages/TugOfWarPage/consts'
import {
  createIsTournamentFinishedSelector,
  createIsTournamentInProgressSelector,
  newsSectionSelector,
  tournamentBroadcastUrlSelector,
  createIsTournamentScheduledSelector,
  createPlayoffRoundsSelector,
  specularBracketWinnersSelector,
  thirdFourPlacesSelector,
  grandFinalWinnerByTournamentIdSelector,
} from 'weplay-events/reduxs/tournaments/reducer'
import { getTournament } from 'weplay-events/reduxs/tournaments/actions'

import ogImage from './img/ogImage.jpg'
import backgroundDireSecUrl from './img/bg-dire-prllx.png'
import backgroundDireUrl from './img/bg-dire-back.jpg'
import logoDireUrl from './img/dire-logo.png'
import backgroundUrl from './img/main-bg.jpg'
import logoUrl from './img/tow-logo.png'
import {
  TUG_OF_WAR_SUBSCRIPTION_SCOPES,
  rulesUrlsRadiant,
  rulesUrlsDire,
} from './consts'

const mapPropsToTournamentId = R.path([
  'match', 'params', 'tournamentId',
])

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    currentLanguage: currentLanguageSelector,
    newsSection: newsSectionSelector,
    isTournamentFinished: createIsTournamentFinishedSelector(mapPropsToTournamentId),
    isTournamentInProgress: createIsTournamentInProgressSelector(mapPropsToTournamentId),
    isTournamentScheduled: createIsTournamentScheduledSelector(mapPropsToTournamentId),
    broadcastUrl: tournamentBroadcastUrlSelector(mapPropsToTournamentId),
    playoffRounds: createPlayoffRoundsSelector('playoff'),
    playoff2Rounds: createPlayoffRoundsSelector('playoff2'),
    playoff3Rounds: createPlayoffRoundsSelector('playoff3'),
    playoff4Rounds: createPlayoffRoundsSelector('playoff4'),
    grandFinal: createPlayoffRoundsSelector('grandFinal'),
    grandFinal2: createPlayoffRoundsSelector('grandFinal2'),
    winners: specularBracketWinnersSelector(mapPropsToTournamentId),
    mainWinner: grandFinalWinnerByTournamentIdSelector(mapPropsToTournamentId),
    currentLanguagePrefix: currentLanguagePrefixSelector,
    thirdFourPlaces: thirdFourPlacesSelector,
  }), {
    // actionCreators
    fetchTournament: getTournament.request,
  }),

  withProps(({
    routeInfo,
    currentLanguagePrefix,
  }) => ({
    modifications: ['lightGreyBg'],
    routeInfo,
    // TODO: This prop should probably live somewhere else
    rulesUrlsRadiant: `${currentLanguagePrefix}${rulesUrlsRadiant}`,
    rulesUrlsDire: `${currentLanguagePrefix}${rulesUrlsDire}`,
    // TODO: Change all beyond data to valid TUG_OF_WAR
    allTweetsUrl: 'https://twitter.com/search?q=%23WePlayArtifact&src=typd',
    allVideosUrl: 'https://www.youtube.com/watch?v=-rEV-QYeWFc&list=PL7ZamGaoLiJxXpSbhVuPnZAE0u3sR91qh',
    contentType: 'Tournament Bracket',
    contentAction: 'Show rules',
  })),

  withPropsOnChange([
    'match',
    'i18nTexts',
  ], ({
    match,
    i18nTexts,
  }) => {
    const stageTitle = match.params.stageTitle
    const isDirePage = stageTitle === TUG_OF_WAR_STAGE_NAMES.DIRE
    const currentStageId = Number(match.params.tournamentId)

    return ({
      currentStageId,
      stageTitle,
      isDirePage,
      subscriptionScope: TUG_OF_WAR_SUBSCRIPTION_SCOPES[stageTitle],
      tournamentStagesDates: {
        start: '2019-02-26T16:00:00+00:00',
        end: '',
      },
      prizeListRules: isDirePage ? [
        `${i18nTexts[stageTitle].prizeDetails.win}`,
      ] : [],
      backgroundUrls: isDirePage ? backgroundDireUrl : backgroundUrl,
      backgroundDireSecUrls: backgroundDireSecUrl,
      logoUrls: isDirePage ? logoDireUrl : logoUrl,
      hrefLangLinkPathname: `/events/dota-2/tug-of-war-${stageTitle}-${currentStageId}`,
    })
  }),

  withPropsOnChange([
    'mainWinner',
    'i18nTexts',
    'isDirePage',
  ], ({
    mainWinner,
    i18nTexts,
    isDirePage,
  }) => ({
    mainWinnerComplemented: isDirePage
      ? [
        {
          ...mainWinner[0],
          label: i18nTexts.dire.heroSection.winner.firstPlaceAmericas,
          prize: 0,
        },
        {
          ...mainWinner[1],
          label: i18nTexts.dire.heroSection.winner.mvpAmericas,
        },
        {
          ...mainWinner[2],
          label: i18nTexts.dire.heroSection.winner.firstPlaceAsia,
        },
        {
          ...mainWinner[3],
          label: i18nTexts.dire.heroSection.winner.mvpAsia,
        },
      ]
      : mainWinner,
    ogImage: isDirePage
      ? ogImage
      : 'https://static-prod.weplay.tv/TOWR_Sharing%20615x300%20copy.jpg',
  })),

  withHandlers({
    handleComponentRender: props => () => {
      props.fetchTournament({
        tournamentId: props.currentStageId,
      })
    },
  }),

  withPageViewAnalytics(),

  lifecycle({
    componentDidMount() {
      this.props.handleComponentRender()
    },

    componentDidUpdate(prevProps) {
      if (prevProps.match.params.tournamentId !== this.props.match.params.tournamentId) {
        this.props.handleComponentRender()
      }
    },
  }),
)

export default container
