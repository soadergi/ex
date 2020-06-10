import { getAreaSize } from './singleElimination'
import { X_OFFSET } from './constants'

export function getButterflyAreaSize(leftSize, rightSize) {
  const height = Math.max(leftSize.height, rightSize.height)
  const width = leftSize.width + X_OFFSET + rightSize.width

  return {
    width,
    height,
  }
}

export function getBracketSizes(depths) {
  const leftBracketSize = getAreaSize(depths.left)
  const rightBracketSize = getAreaSize(depths.right)

  const height = Math.max(leftBracketSize.height, rightBracketSize.height)

  return {
    leftBracketSize: {
      ...leftBracketSize,
      height,
    },
    rightBracketSize: {
      ...rightBracketSize,
      height,
    },
  }
}
