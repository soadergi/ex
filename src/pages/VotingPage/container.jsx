import * as R from 'ramda'
import { connect } from 'react-redux'
import {
  compose, lifecycle, withHandlers, withProps,
} from 'recompose'
import { createStructuredSelector } from 'reselect'

import {
  i18nTextsSelector,
  currentLanguageSelector,
} from 'weplay-core/reduxs/language/reducer'
import withMoment from 'weplay-core/HOCs/withMoment'
import { articlesSelector } from 'weplay-core/reduxs/_legacy/articles/reducer'
import { getArticles } from 'weplay-core/reduxs/_legacy/articles/actions'
import { getIdFromUrl } from 'weplay-core/helpers/getIdFromUrl'
import { optionsByIdSelector } from 'weplay-core/reduxs/votingOptions/reducer'
import { readVotingOptions, createVote } from 'weplay-core/reduxs/votingOptions/actions'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import withCountDown from 'weplay-components/withCountDown'

import { votingByIdSelector } from 'reduxs/votings/reducer'
import { readVoting } from 'reduxs/votings/actions'

import { VOTING_STATUSES } from './consts'

const mapPropsToVotingId = R.path(['match', 'params', 'votingId'])

const container = compose(
  withProps(({ match }) => ({
    votingId: Number(match.params.votingId),
  })),
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    candidates: optionsByIdSelector(mapPropsToVotingId),
    currentLanguage: currentLanguageSelector,
    articles: articlesSelector,
    voting: votingByIdSelector(mapPropsToVotingId),
    isLoggedIn: isLoggedInSelector,
  }), {
    readVotingOptions: readVotingOptions.request,
    postVote: createVote.request,
    readVoting: readVoting.request,
    getArticles,
  }),
  // TODO add OG image when its ready
  withProps({
    ogImages: {
      en: 'https://static-prod.weplay.tv/chooose_.png',
      ru: 'https://static-prod.weplay.tv/choose__ru.png',
    },
    hrefLangPathname: '/voting',
    newsTag: 'vacancy-1191',
  }),
  lifecycle({
    componentDidMount() {
      this.props.readVotingOptions({ votingId: this.props.votingId })
      this.props.readVoting({ votingId: this.props.votingId })
      this.props.getArticles({
        params: {
          language: this.props.currentLanguage,
          tag: getIdFromUrl(this.props.newsTag),
          limit: 3,
          offset: 0,
          sort: '-published',
        },
      })
    },
    componentDidUpdate(prevProps) {
      if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
        this.props.readVotingOptions({ votingId: this.props.votingId })
      }
    },
  }),

  withHandlers({
    handleVote: props => votingOptionId => props.postVote({
      votingId: props.votingId,
      votingOptionId,
    }),
  }),

  withCountDown({
    countdownTimePath: ['voting', 'finishDatetime'],
  }),

  withMoment,
  withProps(({
    countdown,
    voting,
    moment,
  }) => {
    if (!voting) {
      return { status: VOTING_STATUSES.NOT_STARTED }
    }

    if (moment().isBefore(voting.startDatetime)) {
      return { status: VOTING_STATUSES.NOT_STARTED }
    } if (countdown.isPassed) {
      return { status: VOTING_STATUSES.FINISHED }
    }
    return { status: VOTING_STATUSES.IN_PROGRESS }
  }),

  withProps(({
    candidates,
  }) => ({
    firstCandidate: candidates[0] || {},
    thirdCandidate: candidates[2] || {},
  })),
)

export default container
