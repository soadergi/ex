import * as R from 'ramda'
import {
  compose, withHandlers, withStateHandlers, lifecycle,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import { originSelector } from 'weplay-core/reduxs/common/selectors'

import { invitesActions } from 'weplay-competitive/reduxs/invites'
import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'

const container = compose(
  withDiscipline,
  connect(createStructuredSelector({
    origin: originSelector,
  }), {
    // actionCreators
    createInviteLink: invitesActions.createRecord.request,
    getInviteLink: invitesActions.queryRecords.request,
  }),

  withStateHandlers({
    inviteLink: '',
  }, {
    setInviteLink: () => inviteLink => ({ inviteLink }),
  }),

  withHandlers({
    openInviteModal: ({
      getInviteLink, setInviteLink, origin, teamName, discipline,
    }) => (teamId) => {
      getInviteLink({
        'filter[teams.id]': teamId,
      }).then((response) => {
        const token = R.pipe(
          R.propOr([], 'data'),
          R.find(R.pathOr('', ['attributes', 'token'])),
          R.defaultTo({}),
          R.pathOr('', ['attributes', 'token']),
        )(response)
        if (token) {
          const pathWithParams = pathWithParamsByRoute(NAMES.TEAM, {
            teamId,
            teamName,
            discipline,
          })
          setInviteLink(`${origin}${pathWithParams}?key=${token}`)
        }
      })
    },
    resetInviteLink: ({
      setInviteLink, teamId, createInviteLink, teamName, discipline,
    }) => () => {
      createInviteLink({
        data: {
          type: 'Invite',
          relationships: {
            teams: {
              data: [
                {
                  id: teamId,
                  type: 'Team',
                }],
            },
          },
        },
      })
        .then((response) => {
          const token = R.pathOr('', ['data', 'attributes', 'token'])(response)
          const pathWithParams = pathWithParamsByRoute(NAMES.TEAM, {
            teamId,
            teamName,
            discipline,
          })
          setInviteLink(`${origin}${pathWithParams}?key=${token}`)
        })
    },
  }),

  lifecycle({
    componentDidMount() {
      const {
        openInviteModal,
        teamId,
      } = this.props

      openInviteModal(teamId)
    },
  }),

)

export default container
