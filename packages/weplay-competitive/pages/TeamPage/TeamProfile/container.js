import {
  compose,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { teamsActions } from 'weplay-competitive/reduxs/teams'

const container = compose(
  connect(createStructuredSelector({
  }), {
    // actionCreators
    updateTeam: teamsActions.updateRecord.request,
  }),
  withPropsOnChange([
    'team',
  ], ({
    team,
  }) => ({
    background: team.backgroundAvatar || '',
  })),
  withHandlers({
    handleFileUpload: ({
      updateTeam,
      team,
    }) => fileProps => updateTeam({
      data: {
        id: team.id,
        type: team.type,
        attributes: {
          background_avatar: fileProps.link,
        },
      },
    }),
  }),
)

export default container
