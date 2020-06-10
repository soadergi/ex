import * as R from 'ramda'
import {
  compose,
  lifecycle, withProps,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import withMoment from 'weplay-core/HOCs/withMoment'
import {
  i18nTextsSelector,
  currentLanguageSelector,
} from 'weplay-core/reduxs/language/reducer'
import { createStructuredSelector } from 'reselect'
import { votingByIdSelector } from 'reduxs/votings/reducer'
import { readVoting } from 'reduxs/votings/actions'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import { isTabletWidthLegacySelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { grandFinalWinnerByTournamentIdSelector } from 'weplay-events/reduxs/tournaments/reducer'
import { NAMES } from 'weplay-core/routes'

import { votingIds } from '../constants'

import backgroundMob from './img/bg-vote-mob.jpg'
import background from './img/bg-vote.jpg'

const container = compose(
  withRouteInfo,
  connect(createStructuredSelector({
    // selectors
    currentLanguage: currentLanguageSelector,
    i18nTexts: i18nTextsSelector,
    isTabletWidth: isTabletWidthLegacySelector,
    americasVoting: votingByIdSelector(() => votingIds.americas),
    asiaVoting: votingByIdSelector(() => votingIds.asia),
    winnersMVP: grandFinalWinnerByTournamentIdSelector(() => NAMES.VOTING_MWP),
  }), {
    // actionCreators
    readVotingRequest: readVoting.request,
  }),

  withMoment,
  withPropsOnChange([
    'i18nTexts',
    'isTabletWidth',
    'americasVoting',
    'asiaVoting',
    'winnersMVP',
    'moment',
  ], ({
    i18nTexts,
    isTabletWidth,
    americasVoting,
    asiaVoting,
    winnersMVP,
    moment,
  }) => {
    const dateTimeStart = R.prop('startDatetime', americasVoting)
    const dateTimeFinish = R.prop('finishDatetime', americasVoting)
    const prize = R.pathOr('5 000', ['extra', 'prizePool'], americasVoting)

    return ({
      backgroundDevice: isTabletWidth ? backgroundMob : background,
      isVotingFinished: moment().isAfter(dateTimeFinish),
      votesCount: Number(R.prop('votesCount', americasVoting)) + Number(R.prop('votesCount', asiaVoting)),
      title: R.prop('title', americasVoting),
      description: R.prop('description', americasVoting),
      tournamentDates: dateTimeStart && dateTimeFinish ? {
        start: dateTimeStart,
        end: dateTimeFinish,
      } : null,
      prize,
      mainWinner: [
        {
          ...winnersMVP[0],
          label: i18nTexts.votingMVP.heroSection.mvpAmericas,
          prize,
        },
        {
          ...winnersMVP[1],
          label: i18nTexts.votingMVP.heroSection.mvpAsia,
          prize,
        },
      ],
    })
  }),

  withProps(({
    i18nTexts,
  }) => ({
    rewardRules: [`${i18nTexts.votingMVP.heroSection.rewardRules}`],
  })),

  lifecycle({
    componentDidMount() {
      const { readVotingRequest } = this.props

      readVotingRequest({ votingId: votingIds.americas })
      readVotingRequest({ votingId: votingIds.asia })
    },
  }),
)

export default container
