import { compose, withHandlers, withProps } from 'recompose'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import withCurrentLocation from 'weplay-components/withCurrentLocation'
import withCountDown from 'weplay-components/withCountDown'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { triggerSignUpModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { getOptionByIdSelector } from 'weplay-core/reduxs/votingOptions/reducer'
import { createVote } from 'weplay-core/reduxs/votingOptions/actions'

const container = compose(
  connect(createStructuredSelector({
    votingOption: getOptionByIdSelector,
    isLoggedIn: isLoggedInSelector,
    i18nTexts: i18nTextsSelector,
  }), {
    postVote: createVote.request,
    triggerSignUpModal,
  }),
  withCurrentLocation,
  withCountDown({
    countdownTimePath: ['votingOption', 'nextVoteDatetime'],
  }),

  withHandlers({
    handleButtonClick: props => () => {
      if (props.isLoggedIn) {
        props.postVote({
          votingId: props.votingId,
          votingOptionId: props.votingOptionId,
        })
      } else {
        props.triggerSignUpModal()
      }
    },
  }),
  // TODO: maybe rewrite logic here
  withProps(({
    countdown,
    hideTextWhenCountDown,
    i18nTexts,
  }) => {
    let returnButtonText = ''
    if (countdown.isPassed) {
      returnButtonText = i18nTexts.voting.candidates.voteBtn
    } else if (!hideTextWhenCountDown) {
      returnButtonText = i18nTexts.voting.candidates.voteAgain
    }

    return {
      returnButtonText,
    }
  }),
)

container.propTypes = {
  votingOptionId: PropTypes.string.isRequired,
  votingId: PropTypes.string.isRequired,
  hideTextWhenCountDown: PropTypes.bool,
}

export default container
