import {
  compose,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { goTo, NAMES } from 'weplay-core/routes'
import { updateUser } from 'weplay-core/reduxs/_legacy/auth/actions'
import { PROFILE_PATHS } from 'weplay-core/routes/core'

import { membersActions } from 'weplay-competitive/reduxs/members'

const container = compose(
  connect(createStructuredSelector({
  }), {
    // actionCreators
    updateUser,
    findMember: membersActions.findRecord.request,
  }),
  withPropsOnChange([
    'member',
  ], ({
    member,
  }) => ({
    background: member.backgroundAvatar || '',
  })),
  withHandlers({
    handleFileUpload: ({
      updateUser, // eslint-disable-line no-shadow
      member,
      findMember,
    }) => fileProps => updateUser({
      body: { background_avatar: fileProps.link },
    }, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => findMember({ id: member.id })),
    handleClickEdit: ({
      history,
    }) => () => goTo({
      name: NAMES.PROFILE,
      history,
      params: {
        section: PROFILE_PATHS.PERSONAL_INFO,
      },
    }),
  }),
)

export default container
