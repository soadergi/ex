import { useMemo } from 'react'

import { buildTree, getAreaSize, getMinMaxY } from '../logic/tree/singleElimination'
import { convertTreeToArray } from '../logic/tree/helpers'
import { BRACKET_NAME_HEIGHT, Y_PADDING } from '../logic/tree/constants'

const useSingleElimination = (matchesWithOrder, groups) => {
  const depth = useMemo(
    () => matchesWithOrder.reduce((acc, match) => Math.max(Math.abs(match.order), acc), 0),
    [matchesWithOrder],
  )

  const root = useMemo(
    () => matchesWithOrder.find(match => match.parentId === null),
    [matchesWithOrder],
  )

  const tree = useMemo(
    () => buildTree(matchesWithOrder, root, depth),
    [matchesWithOrder, depth, root],
  )

  const nodes = useMemo(
    () => convertTreeToArray(tree),
    [tree],
  )
  const treePosY = getMinMaxY(nodes)
  const nodesWithCorrectY = nodes.map(node => ({
    ...node,
    pos: [
      node.pos[0],
      node.pos[1] + Math.abs(treePosY.min) + BRACKET_NAME_HEIGHT + Y_PADDING,
    ],
  }))

  const areaSize = useMemo(
    () => getAreaSize(depth, treePosY),
    [depth, treePosY],
  )

  return {
    group: groups[0],
    tree,
    nodes: nodesWithCorrectY,
    areaSize,
  }
}

export default useSingleElimination
