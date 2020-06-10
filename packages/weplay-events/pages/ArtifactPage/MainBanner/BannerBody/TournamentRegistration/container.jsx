import * as R from 'ramda'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import withRouter from 'weplay-singleton/RouterProvider/withRouter'
import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import { updateUser } from 'weplay-core/reduxs/_legacy/auth/actions'
import { currentUserSelector, isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { openLoginModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import webAnalytics from 'weplay-core/services/webAnalytics'
import {
  createIsTournamentParticipantSelector,
  createTournamentRegistrationSelector,
  tournamentStagesSelector,
} from 'weplay-events/reduxs/tournaments/reducer'

import { ARTIFACT_STAGE_TITLES } from '../../../consts'


const mapPropsToTournamentId = R.path([
  'match', 'params', 'tournamentId',
])

const container = compose(
  withRouter,
  connect(createStructuredSelector({
    stages: tournamentStagesSelector,
    currentLanguage: currentLanguageSelector,
    currentUser: currentUserSelector,
    isLoggedIn: isLoggedInSelector,
    tournamentRegistration: createTournamentRegistrationSelector(mapPropsToTournamentId),
    isUserRegisteredForTournament: createIsTournamentParticipantSelector(mapPropsToTournamentId),
  }), {
    updateUser,
    openLoginModal,
  }),
  /* eslint-disable no-shadow */
  withHandlers({
    trackDiscordLinkClick: ({
      currentStage,
    }) => () => {
      // TODO: use HOCs analytic
      webAnalytics.sendGeneralEvent({
        eventAction: 'Discord',
        eventLabel: currentStage.id === '2' ? 'Artifact Agility page' : 'Artifact Intelligence page',
        eventCategory: 'Artifact referral click',
      })
    },
    handleRegisterForTournament: ({
      tournamentRegistration,
      isLoggedIn,
      openLoginModal,
      updateUser,
    }) => () => {
      const tournamentRegistrationName = `${ARTIFACT_STAGE_TITLES[tournamentRegistration.id]}_participant`
      let tournamentRegistrationValue = {}
      if (tournamentRegistration) {
        tournamentRegistrationValue = {
          [tournamentRegistrationName]: true,
        }
      }
      if (!isLoggedIn) {
        openLoginModal(tournamentRegistrationValue)
        return
      }
      updateUser({
        body: {
          ...tournamentRegistrationValue,
        },
      }, { headers: { 'Content-Type': 'application/json' } })
    },
  }),
)

export default container
