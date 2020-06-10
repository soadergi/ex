import { createSelector } from 'reselect'

import { matchesSelectors } from 'weplay-events/reduxs/matches'
import { gridItemsSelectors } from 'weplay-events/reduxs/gridItems'

export const makeGroupsByTypeSelector = gridId => createSelector(
  gridItemsSelectors.allRecordsSelector,
  gridItems => gridItems.reduce((acc, gridItem) => {
    if (gridItem.relationships.grid.id === gridId && !gridItem.relationships.container) {
      acc[gridItem.direction] = gridItem
    }
    return acc
  }, {}),
)

export const makeGroupsSelector = gridId => createSelector(
  gridItemsSelectors.allRecordsSelector,
  gridItems => gridItems.reduce((acc, gridItem) => {
    if (gridItem.relationships.grid.id === gridId && !gridItem.relationships.container) {
      acc.push(gridItem)
    }
    return acc
  }, []),
)

export const makeRoundRobinMatchesSelector = gridId => createSelector(
  [matchesSelectors.allRecordsSelector, gridItemsSelectors.allRecordsSelector],
  (allMatches, allGridItems) => {
    const round = allGridItems.find(
      gridItem => gridItem.relationships.grid.id === gridId && gridItem.relationships.container,
    )

    return allMatches.filter(match => match.relationships.gridItem.id === round.id)
  },
)

export const makeGridMatchesWithOrderSelector = gridId => createSelector(
  [matchesSelectors.allRecordsSelector, gridItemsSelectors.allRecordsSelector],
  (matches, gridItems) => {
    const rounds = gridItems.filter(
      gridItem => gridItem.relationships.grid.id === gridId && gridItem.relationships.container,
    )

    const matchIds = []

    rounds.forEach((round) => {
      round.relationships.matches.forEach((match) => {
        matchIds.push(match.id)
      })
    })

    const matchesWithOrder = []

    matches.forEach((match) => {
      if (!matchIds.includes(match.id)) {
        return
      }

      const order = rounds.find(round => round.id === match.relationships.gridItem.id)?.order

      matchesWithOrder.push({
        id: match.id,
        parentId: match.relationships.parent?.id ?? null,
        sequence: match?.extraInfo?.sequence,
        order: order ? -order : order,
        hidden: match?.extraInfo?.hideMatch,
      })
    })

    return matchesWithOrder
  },
)
