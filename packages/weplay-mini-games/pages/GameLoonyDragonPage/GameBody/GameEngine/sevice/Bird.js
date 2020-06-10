import { bird as config, foreground } from './config'

const SLOW_PERIOD = 10
const FAST_PERIOD = 5

class Bird {
  constructor(options) {
    this.ctx = options.ctx
    this.cvs = options.cvs
    this.sprite = options.sprite
    this.socket = options.socket
    this.frame = 0
    this.speed = 0
    this.y = config.y
  }

  draw() {
    const bird = config.animation[this.frame]

    this.ctx.save()
    this.ctx.translate(config.x, this.y)
    this.ctx.drawImage(
      this.sprite, bird.sX, bird.sY, config.w, config.h, -config.w / 2, -config.h / 2, config.w, config.h,
    )
    this.ctx.restore()
  }

  update(frame, state, frames) {
    const period = state.current === state.getReady ? SLOW_PERIOD : FAST_PERIOD

    this.frame += frames % period === 0 ? 1 : 0
    this.frame %= config.animation.length
    this.speed += config.gravity
    this.y = frame.birdY

    if (this.y + config.h / 2 >= this.cvs.height - foreground.h) {
      this.y = this.cvs.height - foreground.h - config.h / 2
    }
  }
}

export default Bird
