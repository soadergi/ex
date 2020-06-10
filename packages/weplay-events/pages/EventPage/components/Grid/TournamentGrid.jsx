import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'

import useAction from 'weplay-core/helpers/useAction'

import InitialPreloader from 'weplay-components/InitialPreloader'

import { gridPropType } from 'weplay-events/customPropTypes'
import { gridItemsActions } from 'weplay-events/reduxs/gridItems'
import {
  makeGridMatchesWithOrderSelector,
  makeGroupsSelector,
} from 'weplay-events/reduxs/tournamentGrid/selectors'
import { MAX_ENTITIES_PER_REQUEST } from 'weplay-events/pages/EventPage/constants'

import { GRID_TYPES } from './constants'
import SingleElimination from './SingleElimination'
import DoubleElimination from './DoubleElimination'
import RoundRobin from './RoundRobin/RoundRobin'
import styles from './tournamentGrid.scss'

const TournamentGrid = ({ grid }) => {
  const { getGridItemsRequest } = useAction({ getGridItemsRequest: gridItemsActions.queryRecords.request })

  const gridMatchesWithOrderSelector = useMemo(() => makeGridMatchesWithOrderSelector(grid.id), [grid.id])
  const matchesWithOrder = useSelector(gridMatchesWithOrderSelector)

  const groupsSelector = useMemo(() => makeGroupsSelector(grid.id), [grid.id])
  const groups = useSelector(groupsSelector)

  useEffect(() => {
    if (grid.id) {
      getGridItemsRequest({
        'filter[grid.id]': grid.id,
        included: 'matches',
        'page[limit]': MAX_ENTITIES_PER_REQUEST,
      })
    }
  }, [getGridItemsRequest, grid.id])

  const root = useMemo(
    () => matchesWithOrder.find(match => match.parentId === null),
    [matchesWithOrder],
  )

  if (!grid.id || !root || groups.length === 0) {
    return (
      <div className={styles.loader}>
        <InitialPreloader />
      </div>
    )
  }

  switch (grid.bracketType) {
    case GRID_TYPES.SINGLE_ELIMINATION:
      return (
        <div className={styles.wrapper}>
          <SingleElimination
            matches={matchesWithOrder}
            groups={groups}
            mirrored
          />
        </div>
      )
    case GRID_TYPES.DOUBLE_ELIMINATION:
      return (
        <div className={styles.wrapper}>
          <DoubleElimination
            grid={grid}
            groups={groups}
            matches={matchesWithOrder}
          />
        </div>
      )
    case GRID_TYPES.ROUND_ROBIN:
      return (
        <div className={styles.roundRobin}>
          <RoundRobin
            grid={grid}
          />
        </div>
      )
    default:
      return null
  }
}

TournamentGrid.propTypes = {
  grid: gridPropType,
}

TournamentGrid.defaultProps = {
  grid: {
    id: '',
    name: '',
    type: '',
  },
}

export default TournamentGrid
