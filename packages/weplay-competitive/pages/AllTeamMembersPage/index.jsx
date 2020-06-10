import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { NAMES } from 'weplay-core/routes'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import paginationPropType from 'weplay-core/customPropTypes/paginationPropType'

import PageHelmet from 'weplay-components/PageHelmet'

import MembersList from 'weplay-competitive/components/MembersList'
import Section from 'weplay-competitive/components/Section'
import CountIndicator from 'weplay-competitive/components/CountIndicator'
import PaginationFooter from 'weplay-competitive/components/PaginationFooter'
import InviteMembersModal from 'weplay-competitive/components/Modals/InviteMembersModal'

import container from './container'
import styles from './styles.scss'

const AllTeamMembers = ({
  // required props

  // container props
  fetchedTeamMembersIds,
  deleteFetchedTeamMember,
  isCaptain,
  pagination,
  fetchByFiltersAndPagination,
  teamId,
  itemName,
  seoParams,
  teamName,
  gameModeSize,

  isShownInviteMembersModal,
  hideInviteMembers,
  showInviteMembers,

  // optional props
}) => {
  const t = useTranslation()
  return (
    <Section
      title={t('competitive.team.manage.title')}
      subtitle={isCaptain ? t('competitive.team.manage.subTitle') : ''}
      linkHandler={showInviteMembers}
      linkIcon="add-member"
      linkText={isCaptain ? t('competitive.team.teamList.inviteMember') : ''}
      isTitleH1
    >
      <PageHelmet
        seoParams={seoParams}
      />
      <CountIndicator
        className={styles.counter}
      >
        {fetchedTeamMembersIds.length}
        {' '}
        {t('competitive.allParticipants.participants')}
      </CountIndicator>
      <div
        className={styles.members}
        data-qa-id={dataQaIds.pages[NAMES.TEAM_MEMBERS].container}
      >
        <MembersList
          teamMembersIds={fetchedTeamMembersIds}
          deleteFetchedTeamMember={deleteFetchedTeamMember}
          captainMode
          teamId={teamId}
          gameModeSize={gameModeSize}
        />
      </div>
      <PaginationFooter
        itemName={itemName}
        pagination={pagination}
        onPaginationChange={fetchByFiltersAndPagination}
      />
      {isCaptain && isShownInviteMembersModal && (
        <InviteMembersModal
          isShown={isShownInviteMembersModal}
          onCloseModal={hideInviteMembers}
          teamId={teamId}
          teamName={teamName}
        />
      )}
    </Section>
  )
}

AllTeamMembers.propTypes = {
  // required props

  // container props
  pagination: paginationPropType.isRequired,
  fetchedTeamMembersIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  fetchByFiltersAndPagination: PropTypes.func.isRequired,
  deleteFetchedTeamMember: PropTypes.func.isRequired,
  teamId: PropTypes.number.isRequired,
  isShownInviteMembersModal: PropTypes.bool.isRequired,
  hideInviteMembers: PropTypes.func.isRequired,
  showInviteMembers: PropTypes.func.isRequired,
  itemName: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired,
  seoParams: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  gameModeSize: PropTypes.number.isRequired,

  // optional props
  isCaptain: PropTypes.bool,
}

AllTeamMembers.defaultProps = {
  // optional props
  isCaptain: false,
}

export default container(AllTeamMembers)
