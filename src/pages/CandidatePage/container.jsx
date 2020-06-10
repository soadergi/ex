import { connect } from 'react-redux'
import {
  compose, lifecycle, withHandlers, withProps,
} from 'recompose'
import { createStructuredSelector } from 'reselect'
import * as R from 'ramda'

import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import { i18nTextsSelector, currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import { goTo, NAMES } from 'weplay-core/routes'
import { readVotingOptions } from 'weplay-core/reduxs/votingOptions/actions'
import { areOptionsFetchedSelector, getOptionByIdSelector } from 'weplay-core/reduxs/votingOptions/reducer'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { articlesFirstNSelector } from 'weplay-core/reduxs/_legacy/articles/reducer'
import { getArticles } from 'weplay-core/reduxs/_legacy/articles/actions'
import { getIdFromUrl } from 'weplay-core/helpers/getIdFromUrl'

import votingId from 'pages/VotingPage/data/votingId'

const container = compose(
  withProps(({ match }) => ({
    votingId: Number(match.params.votingId),
    votingOptionId: Number(match.params.votingOptionId),
    newsTag: 'vacancy-1191',
  })),
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    areOptionsFetched: areOptionsFetchedSelector,
    votingOption: getOptionByIdSelector,
    currentLanguage: currentLanguageSelector,
    isLoggedIn: isLoggedInSelector,
    first3Articles: articlesFirstNSelector(3),
  }), {
    getArticles,
    readVotingOptions: readVotingOptions.request,
  }),

  withPageViewAnalytics(),

  lifecycle({
    componentDidMount() {
      // TODO: add caching here
      if (!this.props.areOptionsFetched) {
        this.props.readVotingOptions({
          votingId: this.props.votingId,
        })
      }
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
    handleClose: ({ history }) => () => {
      goTo({
        history,
        name: NAMES.VOTING,
        params: {
          votingId,
        },
      })
    },
  }),
  // TODO add OG image when its ready
  withProps(({ votingOption }) => ({
    ogImages: {
      en: 'https://depot4wp.blob.core.windows.net/weplay-public/WePlay_Vacancy_En.png',
      ru: 'https://depot4wp.blob.core.windows.net/weplay-public/WePlay_Vacancy_Ru.png',
    },
    hrefLangPathname: '/voting',
    seoParams: {
      candidateName: R.pathOr('', ['title'], votingOption),
    },
  })),
)

export default container
