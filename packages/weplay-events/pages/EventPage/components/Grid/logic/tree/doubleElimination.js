import { X_OFFSET } from './constants'

export function getDoubleEliminationAreaSize(lowerBracketSize, upperBracketSize) {
  return {
    height: lowerBracketSize.height + upperBracketSize.height,
    width: Math.max(lowerBracketSize.width, upperBracketSize.width) + X_OFFSET,
  }
}
