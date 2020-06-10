import React from 'react'
import PropTypes from 'prop-types'
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import { NAMES, pathForRoute } from 'weplay-core/routes'

import AlertModal from 'weplay-components/Modals/AlertModal'

import SteamVerifyPage from 'weplay-competitive/pages/SteamVerifyPage/loadable'
import MemberPage from 'weplay-competitive/pages/MemberPage/loadable'
import TeamPage from 'weplay-competitive/pages/TeamPage/loadable'
import TournamentPage from 'weplay-competitive/pages/TournamentPage/loadable'
import TournamentsPage from 'weplay-competitive/pages/TournamentsPage/loadable'
import LaddersPage from 'weplay-competitive/pages/LaddersPage/loadable'
import LadderPage from 'weplay-competitive/pages/LadderPage/loadable'
import MatchPage from 'weplay-competitive/pages/MatchPage/loadable'
import AllTournamentsPage from 'weplay-competitive/pages/AllTournamentsPage/loadable'
import AllTeamMembersPage from 'weplay-competitive/pages/AllTeamMembersPage/loadable'
import AllParticipantsPage from 'weplay-competitive/pages/AllParticipantsPage/loadable'
import AllMatchesPage from 'weplay-competitive/pages/AllMatchesPage/loadable'
import TournamentBetaPage from 'weplay-competitive/pages/TournamentBetaPage/loadable'
import ZenDeskVerifyPage from 'weplay-competitive/pages/ZenDeskVerifyPage/loadable'
import PremiumSuccessPage from 'weplay-competitive/pages/PremiumSuccessPage/loadable'
import MMMatchPage from 'weplay-competitive/pages/MMMatchPage/MMMatchPage'
import PremiumPage from 'weplay-competitive/pages/PremiumPage/loadable'
import NewTPPages from 'weplay-competitive/newTP/pages/NewTPPages'
import TournamentsSubMenuPortal from 'weplay-competitive/components/TournamentsSubMenuPortal'
import ZendeskSupportWidget from 'weplay-competitive/components/ZendeskSupportWidget'
import { useCreateMemberMiddleware } from 'weplay-competitive/hooks/useCreateMemberMiddleware'
import MMModals from 'weplay-competitive/components/MM/Modals'
import useFeatureSupport from 'weplay-competitive/hooks/useFeatureSupport'
import { FEATURES } from 'weplay-competitive/config/features'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'
import { MEMBER_STATUSES } from 'weplay-competitive/constants/memberStatuses'

import { DISCIPLINE_NAMES } from '../config/disciplines'

import container from './container'

const getAdjustedTournamentsRoute = () => {
  const path = pathForRoute(NAMES.TOURNAMENTS)
  return path.replace(':discipline', `:discipline(${DISCIPLINE_NAMES.join('|')})`)
}

const RouteContainer = ({
  match: { path },
  activeAlertModalType,
  hideAlertModal,
  location,
}) => {
  useCreateMemberMiddleware()
  const { isFeatureSupported } = useFeatureSupport()
  const currentMember = useSelector(currentMemberSelector)
  return (
    <>
      <TournamentsSubMenuPortal location={location} />
      <Switch>
        {isFeatureSupported(FEATURES.NEW_TP_API) && (
          <Route
            path={`${path}/${pathForRoute(NAMES.NEW_TP)}`}
            component={NewTPPages}
          />
        )}
        <Route
          exact
          path={`${path}/${pathForRoute(NAMES.PREMIUM)}`}
          component={PremiumPage}
        />
        <Route
          exact
          path={`${path}/${pathForRoute(NAMES.PREMIUM_SUCCESS)}`}
          component={PremiumSuccessPage}
        />
        <Route
          exact
          path={`${path}/${pathForRoute(NAMES.MEMBER)}`}
          component={MemberPage}
        />
        <Route
          exact
          path={`${path}/${pathForRoute(NAMES.MEMBER_TOURNAMENTS)}`}
          component={AllTournamentsPage}
        />
        <Route
          exact
          path={`${path}/${pathForRoute(NAMES.MEMBER_MATCHES)}`}
          component={AllMatchesPage}
        />
        <Route
          exact
          path={`${path}/${pathForRoute(NAMES.TEAM_TOURNAMENTS)}`}
          component={AllTournamentsPage}
        />
        <Route
          exact
          path={`${path}/${pathForRoute(NAMES.TEAM_MEMBERS)}`}
          component={AllTeamMembersPage}
        />
        <Route
          exact
          path={`${path}/${pathForRoute(NAMES.TEAM)}`}
          component={TeamPage}
        />
        <Route
          exact
          path={`${path}/${pathForRoute(NAMES.STEAM_VERIFY)}`}
          component={SteamVerifyPage}
        />
        <Route
          exact
          path={`${path}/${pathForRoute(NAMES.ZENDESK_VERIFY)}`}
          component={ZenDeskVerifyPage}
        />
        <Route
          exact
          path={`${path}/${pathForRoute(NAMES.TOURNAMENT)}`}
          component={TournamentPage}
        />
        <Route
          exact
          path={`${path}/${pathForRoute(NAMES.TOURNAMENT_PARTICIPANTS)}`}
          component={AllParticipantsPage}
        />
        <Route
          exact
          path={`${path}/${getAdjustedTournamentsRoute(NAMES.TOURNAMENTS)}`}
          component={TournamentsPage}
        />
        <Route
          exact
          path={`${path}/${pathForRoute(NAMES.MATCH)}`}
          component={MatchPage}
        />
        <Route
          exact
          path={`${path}/${pathForRoute(NAMES.LANDING)}`}
          component={TournamentBetaPage}
        />
        {isFeatureSupported(FEATURES.LADDER) && (
        <Route
          exact
          path={`${path}/${pathForRoute(NAMES.LADDER)}`}
          component={LadderPage}
        />
        )}
        {isFeatureSupported(FEATURES.LADDER) && (
        <Route
          exact
          path={`${path}/${pathForRoute(NAMES.LADDERS)}`}
          component={LaddersPage}
        />
        )}
        <Route
          exact
          path={`${path}/${pathForRoute(NAMES.MM_MATCH)}`}
          component={MMMatchPage}
        />
        <Redirect to={`/${pathForRoute(NAMES.NOT_FOUND)}`} />
      </Switch>
      {activeAlertModalType && (
        <AlertModal
          isShown={Boolean(activeAlertModalType)}
          onCloseModal={hideAlertModal}
          onConfirmModal={hideAlertModal}
          texts={`competitive.tournaments.modals.${activeAlertModalType}`}
          preview=""
        />
      )}
      {currentMember?.status !== MEMBER_STATUSES.BANNED && <MMModals />}
      <ZendeskSupportWidget />
    </>
  )
}

RouteContainer.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.shape({}).isRequired,
  activeAlertModalType: PropTypes.string.isRequired,
  hideAlertModal: PropTypes.func.isRequired,
}

export default container(RouteContainer)
