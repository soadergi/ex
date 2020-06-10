import * as R from 'ramda'
import {
  compose,
  withProps,
  withPropsOnChange,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import {
  currentUserSelector,
  isLoggedInSelector,
} from 'weplay-core/reduxs/_legacy/auth/reducer'

import { membersSelectors } from 'weplay-competitive/reduxs/members'
import { teamMembersActions, teamMembersSelectors } from 'weplay-competitive/reduxs/teamMembers'
import { ROLES } from 'weplay-competitive/constants/roles'
import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'

const container = compose(
  withDiscipline,
  withLocale,
  connect(createStructuredSelector({
    currentUser: currentUserSelector,
    isLoggedIn: isLoggedInSelector,
    getMemberById: membersSelectors.getRecordByIdSelector,
    getTeamMemberById: teamMembersSelectors.getRecordByIdSelector,
    // TODO: create selector, when part with Matches will be ready
    hasActiveMatch: () => false,
  }), {
    updateTeamMember: teamMembersActions.updateRecord.request,
    // actionCreators
  }),
  withPropsOnChange([
    'teamMember',
  ], (({
    teamMember,
    getMemberById,
  }) => ({
    member: R.pipe(
      R.pathOr(NaN, ['relationships', 'member', 'id']),
      getMemberById,
    )(teamMember),
  }))),
  withPropsOnChange([
    'currentUser',
    'isLoggedIn',
    'member',
  ], (({
    currentUser,
    isLoggedIn,
    member,
  }) => ({
    isOwner: isLoggedIn && currentUser.id === R.pathOr(NaN, ['id'], member),
  }))),
  withHandlers({
    setTeamMemberStatus: ({ updateTeamMember }) => (role, teamMember) => {
      updateTeamMember({
        data: {
          id: teamMember.id,
          type: teamMember.type,
          attributes: {
            role,
          },
        },
      })
    },
    handlerRemoveTeamMember: ({
      hasActiveMatch,
      showAlertLeaveTeamMemberModal,
      showRemoveMemberModal,
      teamMember,
    }) => () => {
      if (hasActiveMatch) {
        showAlertLeaveTeamMemberModal()
      } else {
        showRemoveMemberModal(teamMember.id)
      }
    },
  }),
  withHandlers({
    handlerRemoveBtn: ({
      hasActiveMatch,
      isOwner,
      showAlertRemoveTeamModal,
      showRemoveTeamModal,
      handlerRemoveTeamMember,
      showAlertRemoveMemberModal,
    }) => () => {
      if (isOwner) {
        if (hasActiveMatch) {
          showAlertRemoveTeamModal()
        } else {
          showRemoveTeamModal()
        }
      } else if (hasActiveMatch) {
        showAlertRemoveMemberModal()
      } else {
        handlerRemoveTeamMember()
      }
    },
  }),
  withDiscipline,
  withProps(({ member, t }) => ({
    rolesDropdownOptions: [
      {
        label: t('competitive.roles.CORE'),
        value: ROLES.CORE,
      },
      {
        label: t('competitive.roles.STAND_IN'),
        value: ROLES.STAND_IN,
      },
    ],
    captainDropdownOptions: [
      {
        label: t('competitive.roles.CAPTAIN'),
        value: ROLES.CAPTAIN,
      },
    ],
    isSteamConnected: Boolean(member?.user?.steamId),
  })),
)

export default container
