import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { matchesSelectors } from 'weplay-events/reduxs/matches'
import { gridItemsSelectors } from 'weplay-events/reduxs/gridItems'

import {
  buildTree,
  getAreaSize,
  getMinMaxY,
} from '../logic/tree/singleElimination'
import { getDoubleEliminationAreaSize } from '../logic/tree/doubleElimination'
import { convertTreeToArray } from '../logic/tree/helpers'
import { BRACKET_TYPES } from '../constants'
import {
  BRACKET_NAME_HEIGHT,
  COLUMN_HEAD_HEIGHT,
  NODE_WIDTH,
  X_OFFSET,
  X_SPACING,
  Y_PADDING,
} from '../logic/tree/constants'

export const useDoubleElimination = (grid, matchesWithOrder, groups) => {
  const getMatchById = useSelector(matchesSelectors.getRecordByIdSelector)
  const getGridItemById = useSelector(gridItemsSelectors.getRecordByIdSelector)
  const gridItems = useSelector(gridItemsSelectors.allRecordsSelector)

  const depth = useMemo(
    () => matchesWithOrder.reduce((acc, match) => Math.max(Math.abs(match.order), acc), 0),
    [matchesWithOrder],
  )

  const groupsByDirection = groups.reduce((acc, group) => {
    acc[group.direction] = group
    return acc
  }, {})

  const finalGroup = groupsByDirection[BRACKET_TYPES.FINAL]
  const finalRound = gridItems.find(gridItem => gridItem.relationships.container?.id === finalGroup.id)

  const root = useMemo(() => matchesWithOrder.find(match => match.parentId === null) ?? {}, [matchesWithOrder])
  const rootChildren = useMemo(
    () => matchesWithOrder.filter(match => match.parentId === root.id),
    [matchesWithOrder, root.id],
  )

  const rootChildrenByGroupType = useMemo(
    () => rootChildren.reduce((acc, rootChild) => {
      const match = getMatchById(rootChild.id)
      const round = getGridItemById(match.relationships.gridItem.id)
      const group = getGridItemById(round.relationships.container.id)

      acc[group.direction] = rootChild

      return acc
    }, {}),
    [rootChildren, getMatchById, getGridItemById],
  )

  const upperTreeRoot = rootChildrenByGroupType[BRACKET_TYPES.UPPER]
  const lowerTreeRoot = rootChildrenByGroupType[BRACKET_TYPES.LOWER]

  const upperTree = useMemo(
    () => buildTree(matchesWithOrder, upperTreeRoot, depth),
    [matchesWithOrder, depth, upperTreeRoot],
  )

  const lowerTree = useMemo(
    () => buildTree(matchesWithOrder, lowerTreeRoot, depth),
    [matchesWithOrder, depth, lowerTreeRoot],
  )

  // TODO: @Anton move this logic to SingleElimination
  const upperNodes = useMemo(() => convertTreeToArray(upperTree), [upperTree])
  const upperTreePosY = getMinMaxY(upperNodes)
  const upper = upperNodes.map(node => ({
    ...node,
    pos: [
      node.pos[0],
      node.pos[1] + Math.abs(upperTreePosY.min) + BRACKET_NAME_HEIGHT + Y_PADDING,
    ],
  }))
  const upperBracketSize = useMemo(() => getAreaSize(depth, upperTreePosY), [depth, upperTreePosY])

  const lowerNodes = useMemo(() => convertTreeToArray(lowerTree), [lowerTree])
  const lowerTreePosY = getMinMaxY(lowerNodes)
  const lower = lowerNodes.map(node => ({
    ...node,
    pos: [
      node.pos[0],
      node.pos[1] + Math.abs(lowerTreePosY.min) + BRACKET_NAME_HEIGHT + Y_PADDING,
    ],
  }))
  const lowerBracketSize = useMemo(() => getAreaSize(depth, lowerTreePosY), [depth, lowerTreePosY])

  const areaSize = useMemo(
    () => getDoubleEliminationAreaSize(lowerBracketSize, upperBracketSize),
    [lowerBracketSize, upperBracketSize],
  )

  return {
    upperGroup: groupsByDirection[BRACKET_TYPES.UPPER],
    lowerGroup: groupsByDirection[BRACKET_TYPES.LOWER],
    finalRound,
    upperTree,
    lowerTree,
    upperMatches: upper,
    lowerMatches: lower,
    root,
    upperBracketSize,
    lowerBracketSize,
    areaSize,
  }
}

const defaultNode = { pos: [0, 0] }

export function useDoubleEliminationBracketConnections({
  areaSize, upperBracketSize, lowerBracketSize, upperRoot = defaultNode, lowerRoot = defaultNode,
}) {
  const rootPos = useMemo(() => [
    areaSize.width - NODE_WIDTH - X_SPACING / 2,
    upperBracketSize.height + (
      areaSize.height - upperBracketSize.height - lowerBracketSize.height
    ) / 2 - BRACKET_NAME_HEIGHT - COLUMN_HEAD_HEIGHT,
  ], [areaSize.height, areaSize.width, upperBracketSize.height, lowerBracketSize.height])

  const upperRootPos = useMemo(() => [
    areaSize.width - X_OFFSET - NODE_WIDTH - X_SPACING / 2,
    upperRoot.pos[1],
  ], [upperRoot, areaSize.width])

  const lowerRootPos = useMemo(() => [
    areaSize.width - X_OFFSET - NODE_WIDTH - X_SPACING / 2,
    upperBracketSize.height + BRACKET_NAME_HEIGHT + lowerRoot.pos[1],
  ], [upperBracketSize.height, lowerRoot, areaSize.width])

  return {
    rootPos,
    upperRootPos,
    lowerRootPos,
  }
}
