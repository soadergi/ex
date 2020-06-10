import * as R from 'ramda'
import {
  compose,
  withHandlers,
  withPropsOnChange,
  withState,
  lifecycle,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { memberStatisticSelector } from 'weplay-competitive/reduxs/statistic/reducer'
import { memberGameProfileActions } from 'weplay-competitive/reduxs/memberGameProfiles'
import { createMemberGameProfileSelector } from 'weplay-competitive/reduxs/commonSelectors/members'
import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'
import { membersActions } from 'weplay-competitive/reduxs/members'
import { DOTA2_ROLES } from 'weplay-competitive/constants/roles/dota2'

const mapPropsToGameId = R.path([
  'tournamentDiscipline', 'id',
])

const mapPropsToId = R.path([
  'match', 'params', 'memberId',
])

const container = compose(
  withDiscipline,
  connect(createStructuredSelector({
    // selectors
    statistic: memberStatisticSelector,
    currentMember: currentMemberSelector,
    memberGameProfile: createMemberGameProfileSelector(mapPropsToId, mapPropsToGameId),
  }), {
    // actionCreators
    createMemberGameProfile: memberGameProfileActions.createRecord.request,
    updateMemberGameProfile: memberGameProfileActions.updateRecord.request,
    queryMember: membersActions.findRecord.request,
  }),
  withLocale,
  withState('activeRole', 'setActiveRole', ''),
  withPropsOnChange([
    'memberGameProfile',
  ], ({
    memberGameProfile,
  }) => ({
    role: DOTA2_ROLES[R.path(['profileData', 'role'])(memberGameProfile)],
  })),
  withPropsOnChange([
    'role',
    'activeRole',
  ], ({
    role,
    activeRole,
  }) => ({
    isButtonDisabled: role === activeRole,
  })),

  withPropsOnChange([
    'isOwner',
    'tournamentDiscipline',
  ], ({
    isOwner,
    tournamentDiscipline,
  }) => ({
    showRole: tournamentDiscipline.statistic.roleSelectOptions.length > 0,
    showSelect: isOwner && tournamentDiscipline.statistic.roleSelectOptions.length > 0,
    selectOptions: tournamentDiscipline.statistic.roleSelectOptions,
  })),
  withPropsOnChange([
    'activeRole',
    't',
  ], ({
    activeRole,
    t,
  }) => ({
    placeholder: activeRole || t('competitive.member.tournamentSection.chooseRole'),
  })),
  withHandlers({
    changeRole: ({
      updateMemberGameProfile,
      createMemberGameProfile,
      memberGameProfile,
      activeRole,
      tournamentDiscipline,
      currentMember,
      queryMember,
    }) => (type) => {
      const memberGameProfileData = {
        type: 'MemberGameProfile',
        attributes: {
          profile_data: {
            role: activeRole.toUpperCase(),
          },
        },
        relationships: {
          game: {
            data: {
              id: tournamentDiscipline.id,
              type: 'Game',
            },
          },
          member: {
            data: {
              id: currentMember.id,
              type: 'Member',
            },
          },
        },
      }
      if (type === 'update') {
        updateMemberGameProfile({
          data: {
            id: memberGameProfile.id,
            ...memberGameProfileData,
          },
        })
      } else {
        createMemberGameProfile({
          data: {
            ...memberGameProfileData,
          },
        })
          .then(() => queryMember({ id: currentMember.id, included: 'member_game_profiles' }))
      }
    },
  }),
  withHandlers({
    handlerSaveRole: ({
      changeRole,
      memberGameProfile,
    }) => () => {
      changeRole(memberGameProfile ? 'update' : 'create')
    },
  }),
  lifecycle({
    componentDidMount() {
      const {
        role,
        setActiveRole,
      } = this.props
      if (role) {
        setActiveRole(role)
      }
    },
    componentDidUpdate(prevProps) {
      const {
        role,
        setActiveRole,
      } = this.props
      if (prevProps.role !== role) {
        setActiveRole(role)
      }
    },
  }),
)

export default container
