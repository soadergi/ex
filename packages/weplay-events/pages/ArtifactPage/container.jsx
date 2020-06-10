import * as R from 'ramda'
import _ from 'lodash'
import { connect } from 'react-redux'
import {
  compose, lifecycle, withHandlers, withProps, withPropsOnChange,
} from 'recompose'
import { createStructuredSelector } from 'reselect'

import {
  currentLanguagePrefixSelector, i18nTextsSelector,
  currentLanguageSelector,
} from 'weplay-core/reduxs/language/reducer'
import { promoCodesActivationDates } from 'weplay-core/helpers/promoCodes'
import { articlesFirstNSelector, articlesSelector } from 'weplay-core/reduxs/_legacy/articles/reducer'
import { getArticles } from 'weplay-core/reduxs/_legacy/articles/actions'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import withArticles from 'weplay-core/HOCs/withArticles'

import {
  createIsTournamentFinishedSelector,
  createIsTournamentInProgressSelector,
  createIsTournamentScheduledSelector,
  createPlayoffRoundsSelector,
  newsSectionSelector,
  tournamentBroadcastUrlSelector,
  tournamentPlayersSelector,
  tournamentStagesSelector,
} from 'weplay-events/reduxs/tournaments/reducer'
import { ARTIFACT_STAGE_REGISTRATION } from 'weplay-events/constants/signUpSources'
import { getTournament } from 'weplay-events/reduxs/tournaments/actions'

import agilityPromocodeImgBg from './img/artifact-page-bg-1.jpg'
import strengthPromocodeImgBg from './img/promocode-banner-bg.jpg'
import promocodeImgLeft from './img/promocode-rune-bounty.png'
import promocodeImgRight from './img/promocode-rune-purple.png'
import { ARTIFACT_STAGE_TITLES, promocodeAgreementUrls, rulesUrls } from './consts'

const mapPropsToTournamentId = R.path([
  'match', 'params', 'tournamentId',
])

const promocodesBannerBgImages = {
  strength: strengthPromocodeImgBg,
  agility: agilityPromocodeImgBg,
  intelligence: '',
}

const container = compose(
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    first6Articles: articlesSelector,
    first3Articles: articlesFirstNSelector(3),
    first4Articles: articlesFirstNSelector(4),
    articles: articlesSelector,
    stages: tournamentStagesSelector,
    isTournamentInProgress: createIsTournamentInProgressSelector(mapPropsToTournamentId),
    isTournamentFinished: createIsTournamentFinishedSelector(mapPropsToTournamentId),
    isTournamentScheduled: createIsTournamentScheduledSelector(mapPropsToTournamentId),
    broadcastUrl: tournamentBroadcastUrlSelector(mapPropsToTournamentId),
    isLoggedIn: isLoggedInSelector,
    currentLanguage: currentLanguageSelector,
    currentLanguagePrefix: currentLanguagePrefixSelector,
    newsSection: newsSectionSelector,
    players: tournamentPlayersSelector,
    playoffRounds: createPlayoffRoundsSelector('playoff'),
  }), {
    getArticles,
    fetchTournament: getTournament.request,
  }),

  withProps(({
    newsSection,
  }) => ({
    sourceType: `${_.kebabCase(newsSection.sourceType)}s`,
    sourceId: newsSection.sourceId,
    activatedDateFrom: promoCodesActivationDates.activatedDateFrom,
    activatedDateTo: promoCodesActivationDates.activatedDateTo,
  })),

  withPropsOnChange([
    'match',
  ], ({
    match,
  }) => ({
    registrationPromoSource: ARTIFACT_STAGE_REGISTRATION[match.params.tournamentId].registrationPromoSource,
    stageTitle: ARTIFACT_STAGE_TITLES[match.params.tournamentId],
    tournamentTitle: 'artifact',
    registrationSource: ARTIFACT_STAGE_REGISTRATION[match.params.tournamentId].registrationSource,
  })),

  withProps(({
    currentLanguagePrefix,
    stageTitle,
  }) => ({
    ogImage: 'https://static-prod.weplay.tv/sharepic.jpg',
    rulesUrls: `${currentLanguagePrefix}${rulesUrls[stageTitle]}`,
    promocodeAgreementUrls: `${currentLanguagePrefix}${promocodeAgreementUrls[stageTitle]}`,
  })),

  withPropsOnChange([
    'stageTitle',
  ], ({
    stageTitle,
  }) => ({
    promocodeImagesData: {
      background: `url(${promocodesBannerBgImages[stageTitle]})`,
      additional: [
        {
          url: promocodeImgLeft,
          className: 'left',
        },
        {
          url: promocodeImgRight,
          className: 'right',
        },
      ],
    },
  })),

  withProps(props => ({
    requestArticlesParams: {
      tag: props.tagId,
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
    stageTitle,
  }) => ({
    tableTabs: [
      {
        title: i18nTexts.tournamentStages[stageTitle].tabs.commands.title,
        id: 'scoreboard',
      },
      {
        title: i18nTexts.tournamentStages[stageTitle].tabs.groups.title,
        id: 'groups',
      },
      {
        title: i18nTexts.tournamentStages[stageTitle].tabs.playOff.title,
        id: 'playOff',
      },
    ],
  })),

  withHandlers({
    handleComponentRender: props => () => {
      props.fetchTournament({
        tournamentId: props.match.params.tournamentId,
      })
    },
    fetchArticles: props => () => props.getArticles({
      params: {
        language: props.currentLanguage,
        [props.newsSection.sourceType]: props.sourceId,
        // TODO using newsSection.sorceId brcause
        //  props.source id is in Kebab case and for request we ned snake case
        limit: 6,
        offset: 0,
        sort: '-published',
      },
    }),
  }),
  lifecycle({
    componentDidMount() {
      this.props.handleComponentRender()
    },
    componentDidUpdate(prevProps) {
      if (prevProps.match.params.tournamentId !== this.props.match.params.tournamentId) {
        this.props.handleComponentRender()
      }
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
