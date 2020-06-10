import { createSelector } from 'reselect'

import { gridItemsSelectors } from './index'

export const getGridItemsByGridIdSelector = createSelector(
  [gridItemsSelectors.allRecordsSelector],
  allGridItems => gridId => allGridItems.filter(
    gridItem => gridItem?.relationships?.grid?.id === gridId,
  ),
)
