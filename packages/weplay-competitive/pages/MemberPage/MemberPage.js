import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import historyPropType from 'weplay-core/customPropTypes/historyPropType'

import PageHelmet from 'weplay-components/PageHelmet'
import AnchorMenu from 'weplay-components/AnchorMenu'

import Wrapper from 'weplay-competitive/components/Wrapper'
import memberPropType from 'weplay-competitive/customPropTypes/memberPropType'
import gameModePropType from 'weplay-competitive/customPropTypes/gameModePropType'
import useConnectSteamModal from 'weplay-competitive/hooks/useConnectSteamModal'
import ConnectSteam from 'weplay-competitive/components/Modals/ConnectSteam/ConnectSteam'

import MemberProfile from './MemberProfile/MemberProfile'
import container from './container'
import styles from './styles.scss'
import { useMemberAllInfo } from './hooks/useMemberAllInfo'
import TeamSection from './TeamSection/TeamSection'
import OverviewSection from './OverviewSection/OverviewSection'
import TournamentsSection from './TournamentsSection/TournamentsSection'
import MatchesSection from './MatchesSection/MatchesSection'
import getMemberPageAnchors from './memberPageAnchors'

const anchorMenuModifiers = ['tournamentModule']

const MemberPage = ({
  // required props
  history,
  member,
  isOwner,

  // container props
  seoParams,
  memberTeamIds,
  showSoonLabel,

  // optional props
  freeTeamsGameModes,
  freeGameModeIDs,
}) => {
  const t = useTranslation()
  const {
    isShownConnectSteam,
    toggleConnectSteamModal,
  } = useConnectSteamModal()

  const {
    matchesIds,
    amountMatches,
    memberTournamentsIds,
    amountMemberTournaments,
  } = useMemberAllInfo()

  const memberPageAnchors = getMemberPageAnchors(t)

  return (
    <>
      <PageHelmet
        seoParams={seoParams}
      />
      <MemberProfile
        isOwner={isOwner}
        member={member}
        history={history}
        toggleConnectSteamModal={toggleConnectSteamModal}
      />
      <AnchorMenu
        anchors={memberPageAnchors}
        modifiers={anchorMenuModifiers}
      />

      <Wrapper className={styles.grid}>
        <TeamSection
          showSoonLabel={showSoonLabel}
          memberTeamIds={memberTeamIds}
          isOwner={isOwner}
          freeTeamsGameModes={freeTeamsGameModes}
          freeGameModeIDs={freeGameModeIDs}
        />
        <OverviewSection
          isOwner={isOwner}
        />
      </Wrapper>
      <TournamentsSection
        isOwner={isOwner}
        memberTournamentsIds={memberTournamentsIds}
        amountMemberTournaments={amountMemberTournaments}
      />

      <MatchesSection
        isOwner={isOwner}
        matchesIds={matchesIds}
        amountMatches={amountMatches}
      />

      {isShownConnectSteam && (
        <ConnectSteam
          isShown={isShownConnectSteam}
          closeHandler={toggleConnectSteamModal}
          finalActionName="closeModal"
          finalAction={toggleConnectSteamModal}
        />
      )}

    </>
  )
}

MemberPage.propTypes = {
  member: memberPropType.isRequired,
  isOwner: PropTypes.bool.isRequired,
  // container props
  history: historyPropType.isRequired,
  seoParams: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  showSoonLabel: PropTypes.bool.isRequired,
  // optional props
  memberTeamIds: PropTypes.arrayOf(PropTypes.number),
  freeTeamsGameModes: PropTypes.arrayOf(gameModePropType),
  freeGameModeIDs: PropTypes.arrayOf(PropTypes.number),
}

MemberPage.defaultProps = {
  // optional props
  memberTeamIds: [],
  freeTeamsGameModes: null,
  freeGameModeIDs: [],
}

export default container(MemberPage)
