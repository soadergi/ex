import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import ConfirmModal from 'weplay-components/Modals/ConfirmModal'
import AlertModal from 'weplay-components/Modals/AlertModal'
import teamMemberPropType from 'weplay-competitive/customPropTypes/teamMemberPropType'
import TeamMember from 'weplay-competitive/components/MembersList/TeamMember'

import container from './container'
import styles from './styles.scss'

const MembersList = ({
  // required props
  teamMembers,
  // props from container
  isCaptain,
  activeAlertModalType,
  activeConfirmModalType,
  coreTeamMembersCount,

  // Confirm modal
  showLeaveTeamMemberModal,
  showRemoveMemberModal,
  showRemoveTeamModal,
  hideConfirmModal,
  handleConfirm,

  // Alert modal
  showAlertLeaveTeamMemberModal,
  showAlertRemoveMemberModal,
  showAlertRemoveTeamModal,
  hideAlertModal,

  // optional props
  captainMode,
  deleteFetchedTeamMember,
  gameModeSize,
}) => {
  const t = useTranslation()
  return (
    <div
      className={classNames(
        styles.list,
      )}
    >
      {teamMembers.map(teamMember => teamMember.isFetched && (
        <TeamMember
          key={teamMember.id}
          isCaptain={isCaptain}
          teamMember={teamMember}
          showLeaveTeamMemberModal={() => showLeaveTeamMemberModal(teamMember.id)}
          showRemoveMemberModal={showRemoveMemberModal}
          showRemoveTeamModal={showRemoveTeamModal}
          showAlertLeaveTeamMemberModal={showAlertLeaveTeamMemberModal}
          showAlertRemoveMemberModal={showAlertRemoveMemberModal}
          showAlertRemoveTeamModal={showAlertRemoveTeamModal}
          captainMode={captainMode}
          deleteFetchedTeamMember={deleteFetchedTeamMember}
          coreTeamMembersCount={coreTeamMembersCount}
          gameModeSize={gameModeSize}
        />
      ))}
      {activeConfirmModalType && (
        <ConfirmModal
          isShown={Boolean(activeConfirmModalType)}
          onCloseModal={hideConfirmModal}
          onConfirm={handleConfirm}
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
        />
      )}

    </div>
  )
}

MembersList.propTypes = {
  // required props
  isCaptain: PropTypes.bool.isRequired,
  teamMembers: PropTypes.arrayOf(teamMemberPropType).isRequired,
  // props from container
  activeConfirmModalType: PropTypes.string.isRequired,
  activeAlertModalType: PropTypes.string.isRequired,
  showLeaveTeamMemberModal: PropTypes.func.isRequired,
  showRemoveMemberModal: PropTypes.func.isRequired,
  showRemoveTeamModal: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  showAlertLeaveTeamMemberModal: PropTypes.func.isRequired,
  showAlertRemoveMemberModal: PropTypes.func.isRequired,
  showAlertRemoveTeamModal: PropTypes.func.isRequired,
  hideConfirmModal: PropTypes.func.isRequired,
  hideAlertModal: PropTypes.func.isRequired,
  coreTeamMembersCount: PropTypes.number.isRequired,
  // optional props
  captainMode: PropTypes.bool,
  deleteFetchedTeamMember: PropTypes.func,
  gameModeSize: PropTypes.number,
}

MembersList.defaultProps = {
  // optional props
  captainMode: false,
  deleteFetchedTeamMember: null,
  gameModeSize: NaN,
}

export default container(MembersList)
