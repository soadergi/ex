import { score as config } from './config'

const TEXT_Y = 50

class Score {
  constructor(options) {
    this.ctx = options.ctx
    this.cvs = options.cvs
    this.value = 0
  }

  draw(state) {
    this.ctx.fillStyle = config.fillStyle
    this.ctx.strokeStyle = config.strokeStyle

    if (state.current === state.game) {
      this.ctx.lineWidth = 2
      this.ctx.font = config.fontBig
      this.ctx.fillText(this.value, this.cvs.width / 2, TEXT_Y)
      this.ctx.strokeText(this.value, this.cvs.width / 2, TEXT_Y)
    }
  }

  get() {
    return this.value
  }

  update(value) {
    this.value = value
  }
}

export default Score
