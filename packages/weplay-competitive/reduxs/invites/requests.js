import { axios } from 'weplay-core/services/axios'

export const addMemberToTeamRequest = token => axios.post(`/tournament-service/team-invites/${token}`)
