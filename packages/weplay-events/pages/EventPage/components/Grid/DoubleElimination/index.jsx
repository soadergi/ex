import React from 'react'
import PropTypes from 'prop-types'

import { gridPropType, matchPropType, groupPropType } from 'weplay-events/customPropTypes'

import BracketConnections from '../Connections/BracketConnections'
import RootMatchNode from '../RootMatchNode'
import { NODE_WIDTH, X_SPACING } from '../logic/tree/constants'
import SingleEliminationTree from '../SingleEliminationTree'
import { GRID_TYPES } from '../constants'

import styles from './styles.scss'
import { useDoubleElimination, useDoubleEliminationBracketConnections } from './container'

const DoubleElimination = ({ grid, matches, groups }) => {
  const {
    root,
    upperBracketSize,
    lowerBracketSize,
    finalRound,
    upperGroup,
    lowerGroup,
    upperTree,
    upperMatches,
    lowerTree,
    lowerMatches,
    areaSize,
  } = useDoubleElimination(grid, matches, groups)

  const {
    rootPos,
    lowerRootPos,
    upperRootPos,
  } = useDoubleEliminationBracketConnections({
    areaSize,
    upperBracketSize,
    lowerBracketSize,
    upperRoot: upperMatches[0],
    lowerRoot: lowerMatches[0],
  })

  return (
    <div
      className={styles.root}
      style={{
        width: `${areaSize.width}px`,
        height: `${areaSize.height}px`,
      }}
    >
      {
        !root.hidden && (
          <>
            <RootMatchNode
              match={root}
              className={styles.rootNode}
              style={{
                right: `${X_SPACING / 2}px`,
                width: NODE_WIDTH,
              }}
              pos={rootPos}
              round={finalRound}
            />

            <BracketConnections
              areaSize={areaSize}
              rootPos={rootPos}
              lowerRootPos={lowerRootPos}
              upperRootPos={upperRootPos}
              gridType={GRID_TYPES.DOUBLE_ELIMINATION}
            />
          </>
        )
      }

      <div className={styles.upper}>
        <SingleEliminationTree
          nodes={upperMatches}
          areaSize={upperBracketSize}
          tree={upperTree}
          group={upperGroup}
        />
      </div>

      <div className={styles.lower}>
        <SingleEliminationTree
          nodes={lowerMatches}
          areaSize={lowerBracketSize}
          tree={lowerTree}
          group={lowerGroup}
        />
      </div>
    </div>
  )
}

DoubleElimination.propTypes = {
  grid: gridPropType.isRequired,
  matches: PropTypes.arrayOf(matchPropType).isRequired,
  groups: PropTypes.arrayOf(groupPropType).isRequired,
}

export default DoubleElimination
