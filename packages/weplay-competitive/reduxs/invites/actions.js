import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import { addMemberToTeamRequest } from 'weplay-competitive/reduxs/invites/requests'

const ADD_MEMBER_TO_TEAM = 'ADD_MEMBER_TO_TEAM'
export const addMemberToTeam = createRequestActions(ADD_MEMBER_TO_TEAM, addMemberToTeamRequest)
