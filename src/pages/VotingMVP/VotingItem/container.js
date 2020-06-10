import * as R from 'ramda'
import {
  compose,
  withHandlers,
  withPropsOnChange,
  lifecycle,
  withProps,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import {
  globalScopeSelector,
  originSelector,
} from 'weplay-core/reduxs/common/selectors'
import { createVote } from 'weplay-core/reduxs/votingOptions/actions'

import { CANDIDATE_ID, VOTING_SIDE } from '../constants'


const SCROLL_MARGIN = 100

const container = compose(
  connect(createStructuredSelector({
    // selectors
    currentLanguage: currentLanguageSelector,
    globalScope: globalScopeSelector,
    origin: originSelector,
  }), {
    // actionCreators
    postVote: createVote.request,
  }),

  withProps(({
    origin,
    match,
    candidate,
    activeTabId,
  }) => ({
    copyLink: `${origin}${match.url}?${CANDIDATE_ID}=${candidate.id}&${VOTING_SIDE}=${activeTabId}`,
  })),

  withHandlers(() => {
    let votingEl
    return {
      votingRef: () => (ref) => { votingEl = ref },
      scrollToVoteOption: ({ globalScope }) => () => {
        if (votingEl) {
          setTimeout(() => {
            globalScope.scrollTo(0, votingEl.offsetTop - SCROLL_MARGIN)
          }, 500)
        }
      },
      handleVote: ({
        candidate,
        postVote,
        activeVotingId,
      }) => () => postVote({
        votingId: activeVotingId,
        votingOptionId: candidate.id,
      }),
    }
  }),

  withPropsOnChange([
    'candidate',
  ], ({
    candidate,
  }) => ({
    socials: R.pipe(
      R.propOr({}, 'extra'),
      extra => R.pickBy(Boolean, {
        twitter: extra.twitter,
        facebook: extra.facebook,
        twitch: extra.twitch,
        liquipedia: extra.liquipedia,
      }),
      R.toPairs,
      R.map(social => ({
        icon: social[0],
        path: social[1],
      })),
    )(candidate),
  })),

  lifecycle({
    componentDidMount() {
      const {
        scrollToVoteOption,
        activeCandidateId,
        candidate,
      } = this.props

      if (candidate.id === activeCandidateId) {
        scrollToVoteOption()
      }
    },
  }),
)

export default container
