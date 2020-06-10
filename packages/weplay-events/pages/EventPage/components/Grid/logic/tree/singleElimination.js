import {
  NODE_HEIGHT,
  X_SPACING,
  X_OFFSET,
  Y_OFFSET,
  INITIAL_POS_X,
  X_PADDING,
  Y_PADDING,
  BRACKET_NAME_HEIGHT,
} from './constants'

export function getAreaSize(depth, treePosY) {
  const width = (depth + 1) * X_OFFSET - X_SPACING + 2 * X_PADDING
  const height = BRACKET_NAME_HEIGHT + Y_PADDING + treePosY.max - treePosY.min + NODE_HEIGHT + Y_PADDING

  return {
    width,
    height,
  }
}

export function calculateX(round, depth) {
  return (depth + round) * X_OFFSET + INITIAL_POS_X
}

function calculateXForRoot(depth) {
  return INITIAL_POS_X + depth * X_OFFSET
}

export function calculateYForRoot() {
  return 0
}

function calculateY(round, parent, depth, sequence, childrenLength) {
  // single child
  if (childrenLength === 1) {
    return parent.pos[1]
  }

  const offset = ((2 ** (depth - Math.abs(round))) * Y_OFFSET) / 2

  // first child
  if (sequence === 1) {
    return parent.pos[1] - offset
  }

  // second child
  return parent.pos[1] + offset
}

function getPosition(order, parent, sequence, childrenLength, depth) {
  return [
    calculateX(order, depth),
    calculateY(order, parent, depth, sequence, childrenLength),
  ]
}

export function getRootPosition(depth, mirrored) {
  return [
    calculateXForRoot(depth, mirrored),
    calculateYForRoot(),
  ]
}

export function createNode(node, parent, pos) {
  return {
    id: node.id,
    parent,
    order: node.order,
    pos,
    children: [],
    hidden: node.hidden,
  }
}

export function buildTree(matches, root, depth) {
  const traverseChildren = (children, parent) => children.map((child, index, arr) => {
    const pos = getPosition(child.order, parent, child.sequence, arr.length, depth)
    const node = createNode(child, parent, pos)
    // TODO: @Anton slice already used children to improve complexity O(n) to O(log(n))
    node.children = traverseChildren(matches.filter(m => m.parentId === child.id), node)

    return node
  })

  const pos = getRootPosition(depth)
  const rootNode = createNode(root, null, pos)
  rootNode.children = traverseChildren(matches.filter(m => m.parentId === rootNode.id), rootNode)

  return rootNode
}

export function getMinMaxY(nodes) {
  return nodes.reduce((acc, node) => {
    if (acc.min === null) {
      acc.min = node.pos[1]
    }

    if (acc.max === null) {
      acc.max = node.pos[1]
    }

    acc.min = Math.min(acc.min, node.pos[1])
    acc.max = Math.max(acc.max, node.pos[1])

    return acc
  }, { min: null, max: null })
}
