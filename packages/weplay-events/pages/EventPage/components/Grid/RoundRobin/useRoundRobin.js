import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { makeRoundRobinMatchesSelector } from 'weplay-events/reduxs/tournamentGrid/selectors'
import { gridItemsSelectors } from 'weplay-events/reduxs/gridItems'
import { participantsSelectors } from 'weplay-events/reduxs/participants'

function appendEmptyParticipants(participants, participantsNumber) {
  const list = participants.slice()

  for (let i = participants.length; i < participantsNumber; i += 1) {
    list.push({
      id: `${i}`,
    })
  }

  return list
}

export default function useRoundRobin(grid) {
  const roundRobinMatchesSelector = useMemo(() => makeRoundRobinMatchesSelector(grid.id), [grid.id])
  const matches = useSelector(roundRobinMatchesSelector)
  const gridItems = useSelector(gridItemsSelectors.allRecordsSelector)
  const getParticipantById = useSelector(participantsSelectors.getRecordByIdSelector)

  const group = gridItems.find(
    gridItem => gridItem.relationships.grid.id === grid.id && !gridItem.relationships.container,
  )

  const groupParticipants = group.relationships.participants.map(p => getParticipantById(p.id))
  const participants = appendEmptyParticipants(groupParticipants, grid.participantsNumber)

  const groupedMatchesByParticipant = matches.reduce((acc, match) => {
    if (match.relationships.participants.length === 0) {
      return acc
    }

    match.relationships.participants.forEach(({ id }) => {
      if (!acc[id]) {
        acc[id] = [match]
      }

      if (acc[id].find(m => m.id === match.id)) {
        return
      }

      acc[id].push(match)
    })

    return acc
  }, {})

  const matchMatrix = useMemo(() => {
    const matrix = []

    for (let i = 0; i < grid.participantsNumber; i += 1) {
      matrix[i] = []

      for (let j = 0; j < grid.participantsNumber; j += 1) {
        if (i === j) {
          matrix[i].push({
            id: `${i}${j}`,
            separator: true,
          })
          // eslint-disable-next-line no-continue
          continue
        }

        const participantA = participants[i]
        const participantB = participants[j]

        const matchesWithParticipantA = groupedMatchesByParticipant[participantA.id] ?? []

        const currentMatch = matchesWithParticipantA.find(
          match => match.relationships.participants.some(
            matchParticipant => matchParticipant.id === participantB.id,
          ),
        )

        const scoreA = currentMatch?.relationships?.participants[0]?.meta?.score ?? null
        const scoreB = currentMatch?.relationships?.participants[1]?.meta?.score ?? null

        const isDuplicate = i <= j

        const match = {
          matchId: currentMatch?.id,
          id: `${i}${j}`,
          scoreA: isDuplicate ? scoreA : scoreB,
          scoreB: isDuplicate ? scoreB : scoreA,
          isDuplicate,
        }

        matrix[i].push(match)
      }
    }

    return matrix
  }, [grid.participantsNumber, participants, groupedMatchesByParticipant])

  return {
    matchMatrix,
    participants,
    groupedMatchesByParticipant,
  }
}
