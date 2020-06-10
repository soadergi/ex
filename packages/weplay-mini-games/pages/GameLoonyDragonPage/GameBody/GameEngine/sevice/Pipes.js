import { pipes as config } from './config'

class Pipes {
  constructor(options) {
    this.ctx = options.ctx
    this.sprite = options.sprite
    this.position = []
  }

  draw() {
    for (let i = 0; i < this.position.length; i += 1) {
      const p = this.position[i]
      const topYPos = p.y
      const bottomYPos = p.y + config.h + config.gap

      this.ctx.drawImage(
        this.sprite, config.top.sX, config.top.sY, config.w, config.h, p.x, topYPos, config.w, config.h,
      )
      this.ctx.drawImage(
        this.sprite, config.bottom.sX, config.bottom.sY, config.w, config.h, p.x, bottomYPos, config.w, config.h,
      )
    }
  }

  update(pipes) {
    this.position = pipes
  }
}

export default Pipes
