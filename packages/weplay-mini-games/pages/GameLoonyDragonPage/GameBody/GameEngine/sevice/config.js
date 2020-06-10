export const background = {
  fillStyle: '#255178',
  sX: 0,
  sY: 0,
  w: 275,
  h: 226,
  x: 0,
  y: 205,
}

export const foreground = {
  sX: 276,
  sY: 0,
  w: 224,
  h: 112,
  x: 0,
  y: 368,
  dX: 25,
}
const MOVE_SPEED = 112
export const line = {
  sX: 276,
  sY: 0,
  w: 224,
  h: 12,
  x: 0,
  y: 368,
  dX: 2,
  move() {
    this.x = (this.x - this.dX) % (MOVE_SPEED)
  },
}

export const readyScreen = {
  sX: 0,
  sY: 228,
  w: 174,
  h: 152,
  x: 74,
  y: 80,
}

export const pipes = {
  top: {
    sX: 553,
    sY: 0,
  },
  bottom: {
    sX: 502,
    sY: 0,
  },
  w: 53,
  h: 400,
  gap: 100,
  maxYPos: -150,
  dx: 2,
}

export const bird = {
  animation: [
    { sX: 276, sY: 113 },
    { sX: 276, sY: 140 },
    { sX: 276, sY: 165 },
    { sX: 276, sY: 140 },
  ],
  x: 50,
  y: 150,
  w: 34,
  h: 26,
  radius: 12,
  gravity: 0.25,
  jump: 4.6,
  rotation: 0,
}

export const score = {
  fillStyle: '#177fc5',
  strokeStyle: '#FFF',
  fontBig: '35px Teko',
  fontSmall: '25px Teko',
  x: 225,
  y: 185,
}
