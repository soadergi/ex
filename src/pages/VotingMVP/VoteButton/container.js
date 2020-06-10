import withCountDown from 'weplay-components/withCountDown'
import {
  compose,
  withProps,
  withPropsOnChange,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import withMoment from 'weplay-core/HOCs/withMoment'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { openLoginModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import {
  i18nTextsSelector,
} from 'weplay-core/reduxs/language/reducer'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import { NAMES } from 'weplay-core/routes'

const container = compose(
  withRouteInfo,
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    isLoggedIn: isLoggedInSelector,
  }), {
    // actionCreators
    openLoginModal,
  }),

  withMoment,
  withPropsOnChange([
    'votingStartDatetime',
    'candidate',
    'moment',
  ], ({
    votingStartDatetime,
    candidate,
    moment,
  }) => {
    const myVoteDateTime = candidate.nextVoteDatetime
      ? moment.max(moment(votingStartDatetime), moment(candidate.nextVoteDatetime))
      : votingStartDatetime
    return ({
      myVoteDateTime,
    })
  }),

  withCountDown({
    countdownTimePath: ['myVoteDateTime'],
  }),

  withProps(({
    i18nTexts,
  }) => ({
    voteRules: [i18nTexts.votingMVP.voteBtn.voteRules],
  })),

  withHandlers({
    handleLogin: props => () => {
      const { history, candidate: { id, votingId } } = props
      history.push({
        ...history.location,
        state: {
          prevPage: NAMES.VOTING_MWP,
          votingId,
          id,
        },
      })
      props.openLoginModal()
    },
  }),

  withPropsOnChange([
    'handleVote',
    'isLoggedIn',
    'handleLogin',
  ], ({
    handleVote,
    isLoggedIn,
    handleLogin, // eslint-disable-line no-shadow
  }) => ({
    handleClick: isLoggedIn ? handleVote : handleLogin,
  })),
)

export default container
