export const MODALS = {
  START: 'startGame',
  END: 'endGame',
}

export const CLOSED_TILE_VALUE = -1
const SIZE = { X: 4, Y: 6 }
const emptyRow = new Array(SIZE.X).fill(CLOSED_TILE_VALUE)
export const emptyBoard = new Array(SIZE.Y).fill(emptyRow)
