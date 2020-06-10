import { createSelector } from 'reselect'

import { tournamentTeamSelectors } from 'weplay-events/reduxs/tournamentTeam'
import { tournamentPlayerSelectors } from 'weplay-events/reduxs/tournamentPlayer'
import { participantsSelectors } from 'weplay-events/reduxs/participants'

// TODO: @Anton @Tony refactor this selector
// https://weplayspace.atlassian.net/browse/WE-1578
export const participantsWithDataSelector = createSelector(
  [
    participantsSelectors.allRecordsSelector,
    tournamentPlayerSelectors.getRecordByIdSelector,
    tournamentTeamSelectors.getRecordByIdSelector,
  ],
  (participants, getTournamentPlayerById, getTournamentTeamById) => {
    const tournamentTeamsWithPlayersByTournamentId = []
    const tournamentPlayersByTournamentId = []

    participants.forEach((participant) => {
      switch (participant.participantType) {
        case 'player':
          // eslint-disable-next-line no-case-declarations
          const id = participant.relationships?.tournamentPlayer?.id
          if (id) {
            tournamentPlayersByTournamentId.push({
              ...getTournamentPlayerById(id),
              participant,
            })
          }
          break
        case 'team':
          // eslint-disable-next-line no-case-declarations
          const team = getTournamentTeamById(participant.relationships?.tournamentTeam?.id)

          if (team?.tba) {
            break
          }

          if (team?.id) {
            const players = team?.relationships?.tournamentPlayers?.map(
              tournamentPlayer => getTournamentPlayerById(tournamentPlayer.id),
            )

            tournamentTeamsWithPlayersByTournamentId.push({
              ...team,
              participant,
              players,
            })
          }
          break
        default:
          break
      }
    })

    const sortedTeams = tournamentTeamsWithPlayersByTournamentId
      .sort((teamA, teamB) => teamB.isInvited - teamA.isInvited)

    return sortedTeams
  },
)
