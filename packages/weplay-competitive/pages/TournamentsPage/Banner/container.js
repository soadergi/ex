import {
  compose,
  withHandlers,
  withProps,
  withState,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { openLoginModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import { updateUser } from 'weplay-core/reduxs/_legacy/auth/actions'
import {
  isLoggedInSelector,
  isPatchedTournamentDota2BetaPlayerSelector,
} from 'weplay-core/reduxs/_legacy/auth/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    isLoggedIn: isLoggedInSelector,
    isTournamentDota2BetaPlayer: isPatchedTournamentDota2BetaPlayerSelector,
  }), {
    // actionCreators
    openLoginModal,
    updateUser,
  }),
  withProps({
    userPatch: {
      is_tournament_dota2_beta_player: true,
    },
  }),
  withState('isButtonClicked', 'setButtonClicked', false),
  withHandlers({
    handleApply: ({
      isLoggedIn,
      openLoginModal, // eslint-disable-line no-shadow
      updateUser, // eslint-disable-line no-shadow
      userPatch,
      setButtonClicked,
    }) => () => {
      if (!isLoggedIn) {
        openLoginModal(userPatch)
      } else {
        updateUser({
          body: userPatch,
        }, { headers: { 'Content-Type': 'application/json' } })
      }
      setButtonClicked(true)
    },
  }),
)

export default container
