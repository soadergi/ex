/* eslint-disable max-lines */
// TODO: competitive team please fix this

import React from 'react'
import PropTypes from 'prop-types'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import ConfirmModal from 'weplay-components/Modals/ConfirmModal'
import AnchorMenu from 'weplay-components/AnchorMenu'
import PageHelmet from 'weplay-components/PageHelmet'
import AlertModal from 'weplay-components/Modals/AlertModal'
import Button, { BUTTON_PRIORITY } from 'weplay-components/Button'

import Section from 'weplay-competitive/components/Section'
import MembersList from 'weplay-competitive/components/MembersList'
import TournamentsListing from 'weplay-competitive/components/TournamentsListing'
import InviteMembersModal from 'weplay-competitive/components/Modals/InviteMembersModal'
import TeamModal from 'weplay-competitive/components/Modals/TeamModal'
import teamPropType from 'weplay-competitive/customPropTypes/teamPropType'
import tournamentPropType from 'weplay-competitive/customPropTypes/tournamentPropType'
import { MAX_TOURNAMENTS, TEAM_MEMBERS_COUNT } from 'weplay-competitive/pages/TeamPage/consts'
import TeamProfile from 'weplay-competitive/pages/TeamPage/TeamProfile'
import TeamGameCard from 'weplay-competitive/pages/TeamPage/TeamGameCard'
import container from 'weplay-competitive/pages/TeamPage/container'
import {
  AT__TEAM_OVERVIEW_ANCHOR,
  AT__TEAM_TOURNAMENTS_ANCHOR,
} from 'weplay-competitive/analytics/amplitude'

import styles from './styles.scss'

const sectionModificationPadding = ['noPaddingY', 'noContainerPaddingX']
const anchorMenuModifiers = ['tournamentModule']

const TeamPage = ({
  // required props
  // props from container
  t,
  team,
  fetchedTeamMembersIds,
  teamTournaments,
  showInviteMembers,
  isShownInviteMembersModal,
  hideInviteMembers,
  isCaptain,
  isShownCreateTeamModal,
  showCreateTeamModal,
  hideCreateTeamModal,
  handleClickMoreTournaments,
  handleClickAllMembers,
  seoParams,
  teamName,

  activeAlertModalType,
  activeConfirmModalType,
  hideAlertModal,
  hideConfirmModal,
  handleInviteToTeam,
  totalTeamMembers,
  amountTournaments,
  // props from HOCs
  discipline,
}) => (
  <>
    <PageHelmet
      seoParams={seoParams}
    />
    <TeamProfile
      team={team}
      handleClickEdit={showCreateTeamModal}
      isOwner={isCaptain}
      discipline={discipline}
    />
    <AnchorMenu
      anchors={[
        {
          link: '#overviewSection',
          text: t('competitive.member.overview.mainTitle'),
          amplitudeEvent: AT__TEAM_OVERVIEW_ANCHOR,
        },
        {
          link: '#tournamentSection',
          text: t('competitive.member.tournamentSection.title'),
          amplitudeEvent: AT__TEAM_TOURNAMENTS_ANCHOR,
        },
      ]}
      modifiers={anchorMenuModifiers}
      className={styles.anchors}
    />
    <Section
      id="overviewSection"
      title={t('competitive.member.overview.mainTitle')}
      className="u-pb-0"
    >
      <div
        className={styles.grid}
        data-event-amplitude-source="Team Profile"
        data-qa-id={dataQaIds.pages[NAMES.TEAM].container}
      >

        <TeamGameCard />

        <Section
          title={t('competitive.team.teamList.title')}
          linkHandler={showInviteMembers}
          linkIcon="add-member"
          linkText={isCaptain ? t('competitive.team.teamList.inviteMember') : ''}
          modifiers={sectionModificationPadding}
        >
          <MembersList
            teamMembersIds={fetchedTeamMembersIds}
          />
          {totalTeamMembers > TEAM_MEMBERS_COUNT && !isCaptain && (
          <Button
            priority={BUTTON_PRIORITY.SECONDARY}
            className={styles.showMore}
            onClick={handleClickAllMembers}
          >
            {t('competitive.member.tournamentSection.showAll')}
          </Button>
          )}
          {isCaptain && (
          <Button
            priority={BUTTON_PRIORITY.SECONDARY}
            className={styles.showMore}
            onClick={handleClickAllMembers}
          >
            {t('competitive.member.tournamentSection.manageTeam')}
          </Button>
          )}
        </Section>
      </div>
    </Section>

    <Section
      id="tournamentSection"
      title={t('competitive.member.tournamentSection.title')}
      subtitle={t('competitive.member.tournamentSection.subTitle')}
    >
      <TournamentsListing
        tournaments={teamTournaments}
        emptyStateText={isCaptain
          ? t('competitive.member.emptyText.noTournamentsOwner')
          : t('competitive.member.emptyText.noMatchesTeam')}
      />
      {amountTournaments > MAX_TOURNAMENTS && (
      <Button
        priority={BUTTON_PRIORITY.SECONDARY}
        onClick={handleClickMoreTournaments}
        className={styles.showMore}
      >
        {t('competitive.member.tournamentSection.showAll')}
      </Button>

      )}
    </Section>

    {/* TODO: Matches part */}
    {/* {false && ( */}
    {/*  <Section */}
    {/*    id="matchesSection" */}
    {/*    title={t('competitive.member.matchesSection.title')} */}
    {/*    subtitle={t('competitive.member.matchesSection.subTitle')} */}
    {/*  > */}
    {/*    <MatchRaw */}
    {/*      discipline={discipline} */}
    {/*    /> */}
    {/* <Button */}
    {/*    priority={BUTTON_PRIORITY.SECONDARY} */}
    {/*    className={styles.showMore} */}
    {/* > */}
    {/*  {t('competitive.member.tournamentSection.showAll')} */}
    {/* </Button> */}
    {/*  </Section> */}
    {/* )} */}

    {isCaptain && isShownInviteMembersModal && (
      <InviteMembersModal
        isShown={isShownInviteMembersModal}
        onCloseModal={hideInviteMembers}
        teamId={team.id}
        teamName={teamName}
      />
    )}
    {team.isFetched && isShownCreateTeamModal && (
      <TeamModal
        team={team}
        isShown={isShownCreateTeamModal}
        onCloseTeamModal={hideCreateTeamModal}
        onSuccess={hideCreateTeamModal}
      />
    )}
    {activeConfirmModalType && (
      <ConfirmModal
        isShown={Boolean(activeConfirmModalType)}
        onCloseModal={hideConfirmModal}
        onConfirm={handleInviteToTeam}
        title={t(`competitive.team.modals.${activeConfirmModalType}.title`)}
        subTitle={t(`competitive.team.modals.${activeConfirmModalType}.subTitle`)}
        confirmBtnText={t(`competitive.team.modals.${activeConfirmModalType}.confirmBtnText`)}
        closeBtnText={t(`competitive.team.modals.${activeConfirmModalType}.closeBtnText`)}
      />
    )}
    {activeAlertModalType && (
      <AlertModal
        isShown={Boolean(activeAlertModalType)}
        onCloseModal={hideAlertModal}
        onConfirmModal={hideAlertModal}
        texts={`competitive.team.modals.${activeAlertModalType}`}
        preview=""
      />
    )}
  </>
)

TeamPage.propTypes = {
  isCaptain: PropTypes.bool.isRequired,
  fetchedTeamMembersIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  teamTournaments: PropTypes.arrayOf(tournamentPropType).isRequired,
  isShownInviteMembersModal: PropTypes.bool.isRequired,
  showInviteMembers: PropTypes.func.isRequired,
  hideInviteMembers: PropTypes.func.isRequired,
  team: teamPropType.isRequired,
  totalTeamMembers: PropTypes.number.isRequired,
  // container props
  t: PropTypes.func.isRequired,
  isShownCreateTeamModal: PropTypes.bool.isRequired,
  showCreateTeamModal: PropTypes.func.isRequired,
  hideCreateTeamModal: PropTypes.func.isRequired,
  handleClickMoreTournaments: PropTypes.func.isRequired,
  handleClickAllMembers: PropTypes.func.isRequired,
  handleInviteToTeam: PropTypes.func.isRequired,
  amountTournaments: PropTypes.number.isRequired,
  seoParams: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  teamName: PropTypes.string.isRequired,

  activeAlertModalType: PropTypes.string.isRequired,
  activeConfirmModalType: PropTypes.string.isRequired,
  hideAlertModal: PropTypes.func.isRequired,
  hideConfirmModal: PropTypes.func.isRequired,
  // props from HOCs
  discipline: PropTypes.string.isRequired,
}

export default container(TeamPage)
