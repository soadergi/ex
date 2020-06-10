import * as R from 'ramda'
import {
  compose,
  withStateHandlers,
  withHandlers, withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { NAMES, goTo } from 'weplay-core/routes'
import transliterate from 'weplay-core/helpers/translit'
import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import { teamMembersActions, teamMembersSelectors } from 'weplay-competitive/reduxs/teamMembers'
import { isCaptainSelector, captainIdSelector } from 'weplay-competitive/reduxs/commonSelectors/teamMembers'
import { ROLES } from 'weplay-competitive/constants/roles'
import { teamsActions } from 'weplay-competitive/reduxs/teams'
import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'

const mapPropsToTeamId = R.pipe(
  R.path([
    'match', 'params', 'teamId',
  ]),
  Number,
)

const container = compose(
  withRouter,
  withDiscipline,
  connect(createStructuredSelector({
    // selectors
    isCaptain: isCaptainSelector(mapPropsToTeamId),
    id: captainIdSelector(mapPropsToTeamId),
    getTeamMemberById: teamMembersSelectors.getRecordByIdSelector,
    currentUser: currentUserSelector,
  }), {
    // actionCreators
    deleteTeamMember: teamMembersActions.deleteRecord.request,
    deleteTeam: teamsActions.deleteRecord.request,
  }),

  withPropsOnChange([
    'teamMembersIds',
    'getTeamMemberById',
  ], ({
    teamMembersIds,
    getTeamMemberById,
  }) => ({
    teamMembers: teamMembersIds.map(getTeamMemberById),
  })),

  withPropsOnChange([
    'teamMembers',
  ], ({
    teamMembers,
  }) => ({
    coreTeamMembersCount: R.pipe(
      R.filter(R.propEq('role', ROLES.CORE)),
      R.length,
    )(teamMembers),
  })),

  withStateHandlers({
    activeConfirmModalType: '',
    activeId: null,
  }, {
    showLeaveTeamMemberModal: () => memberId => ({
      activeConfirmModalType: 'leaveTeam',
      activeId: memberId,
    }),
    showRemoveMemberModal: () => memberId => ({
      activeConfirmModalType: 'removeMember',
      activeId: memberId,
    }),
    showRemoveTeamModal: () => () => ({
      activeConfirmModalType: 'removeTeam',
    }),
    hideConfirmModal: () => () => ({
      activeConfirmModalType: '',
      activeId: null,
    }),
  }),
  withHandlers({
    handleConfirm: ({
      activeConfirmModalType,
      activeId,
      teamId,
      currentUser,
      discipline,

      deleteTeamMember,
      deleteFetchedTeamMember,
      deleteTeam,
      hideConfirmModal,
      history,
    }) => () => {
      switch (activeConfirmModalType) {
        case 'leaveTeam':
        case 'removeMember':
          return deleteTeamMember({ id: activeId }).finally(() => {
            hideConfirmModal()
            deleteFetchedTeamMember(activeId)
          })
        case 'removeTeam':
          return deleteTeam({ id: teamId }).finally(() => goTo({
            name: NAMES.MEMBER,
            history,
            params: {
              memberId: currentUser.id,
              memberName: transliterate(currentUser.nickname),
              discipline,
            },
          }))
        default:
          return hideConfirmModal()
      }
    },
  }),

  withStateHandlers({
    activeAlertModalType: '',
  }, {
    showAlertLeaveTeamMemberModal: () => () => ({
      activeAlertModalType: 'alertLeaveTeam',
    }),
    showAlertRemoveMemberModal: () => () => ({
      activeAlertModalType: 'alertRemoveMember',
    }),
    showAlertRemoveTeamModal: () => () => ({
      activeAlertModalType: 'alertRemoveTeam',
    }),
    hideAlertModal: () => () => ({
      activeAlertModalType: '',
    }),
  }),
)

export default container
