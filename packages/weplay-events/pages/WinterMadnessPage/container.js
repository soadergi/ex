import _ from 'lodash'
import {
  compose,
  lifecycle,
  withProps,
  withHandlers, withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  currentLanguagePrefixSelector, i18nTextsSelector,
  currentLanguageSelector,
} from 'weplay-core/reduxs/language/reducer'
import { getArticles } from 'weplay-core/reduxs/_legacy/articles/actions'
import { articlesFirstNSelector } from 'weplay-core/reduxs/_legacy/articles/reducer'
import withScrollAnalytics from 'weplay-core/HOCs/withScrollAnalytics'

import {
  createIsTournamentInProgressSelector,
  createIsTournamentFinishedSelector,
  createIsTournamentScheduledSelector,
  tournamentBroadcastUrlSelector,
  tournamentHasSponsorsSelector,
  newsSectionSelector,
  createPlayoffRoundsSelector,
  winnerSelector,
  topEightWinnersSelector,
} from 'weplay-events/reduxs/tournaments/reducer'
import { getTournament } from 'weplay-events/reduxs/tournaments/actions'

import promocodeImgLeft from './img/snowball.png'
import promocodeImgBg from './img/main-bg.jpg'
import {
  MADNESS_TOURNAMENT_ID,
  rulesUrls,
  promocodeAgreementUrls,
} from './consts'

const mapPropsToTournamentId = () => MADNESS_TOURNAMENT_ID

const container = compose(
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    first3Articles: articlesFirstNSelector(3),
    first4Articles: articlesFirstNSelector(4),
    isTournamentInProgress: createIsTournamentInProgressSelector(mapPropsToTournamentId),
    isTournamentFinished: createIsTournamentFinishedSelector(mapPropsToTournamentId),
    isTournamentScheduled: createIsTournamentScheduledSelector(mapPropsToTournamentId),
    broadcastUrl: tournamentBroadcastUrlSelector(mapPropsToTournamentId),
    tournamentHasSponsors: tournamentHasSponsorsSelector,
    newsSection: newsSectionSelector,
    currentLanguage: currentLanguageSelector,
    currentLanguagePrefix: currentLanguagePrefixSelector,
    playoffRounds: createPlayoffRoundsSelector('playoff'),
    mainWinner: winnerSelector,
    winners: topEightWinnersSelector,
  }), {
    fetchTournament: getTournament.request,
    getArticles,
  }),
  withScrollAnalytics,

  withProps(({
    currentLanguagePrefix,
  }) => ({
    MADNESS_TOURNAMENT_ID,
    // TODO: Change all beyond data to valid WINTER_MADNESS
    ogImage: 'https://static-prod.weplay.tv/Axe_Sharepic.jpg',
    // TODO: This prop should probably live somewhere else
    tournamentTitle: 'winterMadness',
    rulesUrls: `${currentLanguagePrefix}${rulesUrls}`,
    promocodeAgreementUrls: `${currentLanguagePrefix}${promocodeAgreementUrls}`,
    promocodeImagesData: {
      background: `url(${promocodeImgBg})`,
      additional: [
        {
          url: promocodeImgLeft,
          className: 'left',
        },
      ],
    },
  })),
  withProps(({
    newsSection,
  }) => ({
    sourceType: `${_.kebabCase(newsSection.sourceType)}s`,
    sourceId: newsSection.sourceId,
  })),

  // TODO: replace with HOC
  withPropsOnChange([
    'i18nTexts',
    'stageTitle',
  ], ({
    i18nTexts,
    tournamentTitle,
  }) => ({
    tableTabs: [
      {
        title: i18nTexts.tournamentStages[tournamentTitle].tabs.commands.title,
        id: 'scoreboard',
      },
      {
        title: i18nTexts.tournamentStages[tournamentTitle].tabs.groups.title,
        id: 'groups',
      },
      {
        title: i18nTexts.tournamentStages[tournamentTitle].tabs.playOff.title,
        id: 'playOff',
      },
    ],
  })),

  withHandlers({
    fetchArticles: props => () => props.getArticles({
    // TODO: move this to it's own component
      params: {
        language: props.currentLanguage,
        [props.newsSection.sourceType]: props.sourceId,
        limit: 6,
        offset: 0,
        sort: '-published',
      },
    }),
  }),
  withHandlers({
    handleComponentRender: props => () => {
      props.fetchTournament({
        tournamentId: props.MADNESS_TOURNAMENT_ID,
      })
    },
  }),

  lifecycle({
    componentDidMount() {
      this.props.handleComponentRender()
    },
    componentDidUpdate(prevProps) {
      if (prevProps.currentLanguage !== this.props.currentLanguage
          || prevProps.newsSection.sourceId !== this.props.newsSection.sourceId
          || prevProps.newsSection.sourceType !== this.props.newsSection.sourceType
      ) {
        this.props.fetchArticles()
      }
    },
  }),
)

export default container
