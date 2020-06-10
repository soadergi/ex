import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { gridItemsSelectors } from 'weplay-events/reduxs/gridItems'
import { matchesSelectors } from 'weplay-events/reduxs/matches'

export function useSingleEliminationTree(tree, group) {
  const matches = useSelector(matchesSelectors.allRecordsSelector)
  const allRounds = useSelector(gridItemsSelectors.allRecordsSelector)

  const roundsOfGroup = useMemo(
    () => allRounds.filter(round => round.relationships?.container?.id === group.id)
      .sort((a, b) => a.order - b.order)
      .map((round) => {
        const matchesOfRound = matches.filter(match => match.relationships.gridItem.id === round.id)
        const allMatchesAreHidden = matchesOfRound.every(match => match.extraInfo.hideMatch)

        return {
          ...round,
          isHidden: allMatchesAreHidden,
        }
      }),
    [allRounds, group.id, matches],
  )

  return {
    rounds: roundsOfGroup,
  }
}
