import _ from 'lodash'
import {
  compose,
  lifecycle,
  withProps,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { promoCodesActivationDates } from 'weplay-core/helpers/promoCodes'
import {
  currentLanguagePrefixSelector,
  i18nTextsSelector,
  currentLanguageSelector,
} from 'weplay-core/reduxs/language/reducer'
import { getArticles } from 'weplay-core/reduxs/_legacy/articles/actions'
import { articlesFirstNSelector } from 'weplay-core/reduxs/_legacy/articles/reducer'
import withArticles from 'weplay-core/HOCs/withArticles'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import withScrollAnalytics from 'weplay-core/HOCs/withScrollAnalytics'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'

import {
  createIsTournamentInProgressSelector,
  createIsTournamentFinishedSelector,
  createIsTournamentScheduledSelector,
  tournamentBroadcastUrlSelector,
  tournamentHasSponsorsSelector,
  isTournamentLoadingSelector,
  newsSectionSelector,
  createPlayoffRoundsSelector,
  winnerSelector,
  topEightWinnersSelector,
} from 'weplay-events/reduxs/tournaments/reducer'
import { getTournament } from 'weplay-events/reduxs/tournaments/actions'

import promocodeImgLeft from './img/bounty-rune.png'
import promocodeImgBg from './img/lock-n-load-promo-bg.jpg'
import {
  LOCK_AND_LOAD_TOURNAMENT_ID,
  rulesUrls,
  promocodeAgreementUrls,
} from './consts'

const mapPropsToTournamentId = () => LOCK_AND_LOAD_TOURNAMENT_ID

const container = compose(
  withRouteInfo,
  withAnalytics,
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    isTournamentLoading: isTournamentLoadingSelector,
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
    LOCK_AND_LOAD_TOURNAMENT_ID,
    // TODO: Change all beyond data to valid WINTER_MADNESS
    ogImage: 'https://static-prod.weplay.tv/'
        + 'CS_GO%20Lock&Load%20-%20Sharing%20picture%20-%20615x300.png',
    allTweetsUrl: 'https://twitter.com/search?q=%23WePlayArtifact&src=typd',
    allVideosUrl: 'https://www.youtube.com/watch?v=-rEV-QYeWFc&list=PL7ZamGaoLiJxXpSbhVuPnZAE0u3sR91qh',
    // TODO: This prop should probably live somewhere else
    tournamentTitle: 'lockAndLoad',
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
    activatedDateFrom: promoCodesActivationDates.activatedDateFrom,
    activatedDateTo: promoCodesActivationDates.activatedDateTo,
    bannerEventCategory: 'CSGO LnL landing click',
    bannerEventAction: 'Tournaments',
  })),
  withProps(({
    newsSection,
  }) => ({
    sourceType: `${_.kebabCase(newsSection.sourceType)}s`,
    sourceId: newsSection.sourceId,
  })),
  withProps(props => ({
    requestArticlesParams: {
      [props.newsSection.sourceType]: props.sourceId,
      limit: 6,
      offset: 0,
      sort: '-published',
    },
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
    handleComponentRender: props => () => {
      props.fetchTournament({
        tournamentId: props.LOCK_AND_LOAD_TOURNAMENT_ID,
      })
    },
    fetchArticles: props => () => props.getArticles({
      params: {
        language: props.currentLanguage,
        [props.newsSection.sourceType]: props.sourceId,
        limit: 6,
        offset: 0,
        sort: '-published',
      },
    }),
  }),

  withPageViewAnalytics(),

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
  withArticles,
)

export default container
