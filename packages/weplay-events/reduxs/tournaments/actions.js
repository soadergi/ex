import { createRequestActions } from 'weplay-core/reduxs/_factories/request/createRequestActions'

import { getTournamentRequest, getTournamentsRequest } from './requests'

const GET_TOURNAMENT = 'GET_TOURNAMENT'
export const getTournament = createRequestActions(GET_TOURNAMENT, getTournamentRequest)

const GET_TOURNAMENTS = 'GET_TOURNAMENTS'
export const getTournaments = createRequestActions(GET_TOURNAMENTS, getTournamentsRequest)
