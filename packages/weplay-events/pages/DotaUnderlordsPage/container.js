import _ from 'lodash'
import * as R from 'ramda'
import {
  compose,
  lifecycle,
  withHandlers,
  withProps,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  currentLanguagePrefixSelector,
  currentLanguageSelector,
  i18nTextsSelector,
} from 'weplay-core/reduxs/language/reducer'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'

import withPreloader from 'weplay-components/withPreloader'

import {
  createIsTournamentFinishedSelector,
  createIsTournamentInProgressSelector,
  createIsTournamentScheduledSelector,
  currentTournamentIdSelector,
  tournamentBroadcastUrlSelector,
  tournamentGroupMainWinnerSelector,
  tournamentOtherWinnersSelector,
  tournamentTitleSelector,
} from 'weplay-events/reduxs/tournaments/reducer'
import { getTournament } from 'weplay-events/reduxs/tournaments/actions'

import ogImage from './img/ogImage.jpeg'
import {
  AUTO_CHESS_ID,
  PLAYOFF_WINNERS_AMOUNT,
  promocodeAgreementUrls,
  promoCodesActivationDatesGroup,
  rulesUrls,
} from './consts'

const getAutoChessId = () => AUTO_CHESS_ID

const container = compose(
  withRouteInfo,
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    currentLanguage: currentLanguageSelector,
    isTournamentFinished: createIsTournamentFinishedSelector(getAutoChessId),
    isTournamentInProgress: createIsTournamentInProgressSelector(getAutoChessId),
    isTournamentScheduled: createIsTournamentScheduledSelector(getAutoChessId),
    broadcastUrl: tournamentBroadcastUrlSelector(getAutoChessId),
    currentLanguagePrefix: currentLanguagePrefixSelector,
    tournamentTitle: tournamentTitleSelector,
    mainWinner: tournamentGroupMainWinnerSelector,
    tournamentOtherWinners: tournamentOtherWinnersSelector(PLAYOFF_WINNERS_AMOUNT),
    currentTournamentId: currentTournamentIdSelector,
  }), {
    // actionCreators
    fetchTournament: getTournament.request,
  }),

  withProps(({
    ogImage,
    activatedDateFrom: promoCodesActivationDatesGroup.activatedDateFrom,
    activatedDateTo: promoCodesActivationDatesGroup.activatedDateTo,
    // analytics
  })),

  withPropsOnChange([
    'tournamentTitle',
    'currentLanguagePrefix',
    'tournamentOtherWinners',
    'i18nTexts',
    'currentLanguage',
    'routeInfo',
  ], ({
    tournamentTitle,
    currentLanguagePrefix,
    tournamentOtherWinners,
    i18nTexts,
    currentLanguage,
    routeInfo,
  }) => ({
    currentStageId: AUTO_CHESS_ID,
    hreflangUrl: `/${routeInfo.project}/${routeInfo.path}`,
    tournamentTitle: _.camelCase(tournamentTitle),
    promocodeAgreementUrls: `${currentLanguagePrefix}${promocodeAgreementUrls}`,
    winners: tournamentOtherWinners.map((winner, index) => ({
      ...winner,
      label: i18nTexts.dotaUnderlords.heroSection.prize[index + 2],
      iconName: !index && 'silverCup',
    })),
    rulesUrls: rulesUrls[currentLanguage],
  })),

  withHandlers({
    handleComponentRender: props => () => {
      props.fetchTournament({
        tournamentId: AUTO_CHESS_ID,
      })
    },
  }),

  withPageViewAnalytics(),

  lifecycle({
    componentDidMount() {
      this.props.handleComponentRender()
    },
  }),

  withPreloader({
    mapPropsToIsLoading: R.pipe(
      R.prop('currentTournamentId'),
      Number,
      currentTournamentId => currentTournamentId !== AUTO_CHESS_ID,
    ),
    isFullScreen: false,
  }),
)

export default container
