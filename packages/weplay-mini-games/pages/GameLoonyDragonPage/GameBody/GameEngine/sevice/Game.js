import spriteImage from './img/sprite.png'
import {
  background as bg, foreground as fg, readyScreen as rs, line,
} from './config'
import Pipes from './Pipes'
import Bird from './Bird'
import Score from './Score'

class Game {
  constructor(options) {
    this.socketUrl = options.socketUrl
    this.onEndGame = options.onEndGame
    this.cvs = options.cvs

    this.sprite = new Image()
    this.socket = null
    this.ctx = null
    this.pipes = null
    this.bird = null
    this.score = null
    this.handleGameControl = this.handleGameControl.bind(this)
    this.handleKeyboardPress = this.handleKeyboardPress.bind(this)
    this.frames = 0
    this.state = {
      current: 0,
      getReady: 0,
      game: 1,
      over: 2,
    }
  }

  renderStatic() {
    // background:
    this.ctx.drawImage(this.sprite, bg.sX, bg.sY, bg.w, bg.h, bg.x, bg.y, bg.w, bg.h)
    this.ctx.drawImage(this.sprite, bg.sX, bg.sY, bg.w, bg.h, bg.x + bg.w, bg.y, bg.w + fg.dX, bg.h)
    // foreground:
    this.ctx.drawImage(this.sprite, fg.sX, fg.sY, fg.w, fg.h, fg.x, fg.y, fg.w, fg.h)
    this.ctx.drawImage(this.sprite, fg.sX, fg.sY, fg.w, fg.h, fg.x + fg.w, fg.y, fg.w + fg.dX, fg.h)
    // ready status:
    if (this.state.current === this.state.getReady) {
      const x = this.cvs.width / 2 - rs.w / 2
      this.ctx.drawImage(this.sprite, rs.sX, rs.sY, rs.w, rs.h, x, rs.y, rs.w, rs.h)
    }
  }

  draw() {
    this.ctx.fillStyle = bg.fillStyle
    this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height)

    this.renderStatic()
    this.bird.draw()
    this.pipes.draw()
    this.ctx.drawImage(this.sprite, fg.sX, fg.sY, fg.w, fg.h, fg.x, fg.y, fg.w, fg.h)
    this.ctx.drawImage(this.sprite, fg.sX, fg.sY, fg.w, fg.h, fg.x + fg.w, fg.y, fg.w + fg.dX, fg.h)
    this.ctx.drawImage(this.sprite, line.sX, line.sY, line.w, line.h, line.x, line.y, 2 * line.w, line.h)
    this.ctx.drawImage(this.sprite, line.sX, line.sY,
      line.w, line.h, line.x + line.w, line.y, 2 * line.w - line.dX, line.h)
    line.move()
    this.score.draw(this.state)
  }

  sendCommand = (command) => {
    this.socket.send(JSON.stringify({ command }))
  }

  handleGameControl(e) {
    e.preventDefault()
    if (this.state.current === this.state.over) {
      this.sendCommand('reset')
    }
    if (this.state.current === this.state.getReady) {
      this.state.current = this.state.game
      this.sendCommand('start')
    }
    this.sendCommand('action')
  }

  handleKeyboardPress(e) {
    if (e.code === 'Space') {
      this.handleGameControl(e)
    }
  }

  initSocket() {
    this.socket = new WebSocket(this.socketUrl)
    this.socket.onopen = () => {
      // dirty hack because incorrect canvas image drawing
      setTimeout(() => this.draw(), 0)
    }
    this.socket.onmessage = (data) => {
      const frame = JSON.parse(data.data)

      this.score.update(frame.score)
      if (!frame.status) {
        this.frames = frame.frame
        this.bird.update(frame, this.state, this.frames)
        this.pipes.update(frame.pipes)
        this.draw()
      } else {
        this.state.current = this.state.over
        this.onEndGame(this.score.get())
      }
    }
  }

  init() {
    this.sprite.src = spriteImage
    this.ctx = this.cvs.getContext('2d')
    this.pipes = new Pipes({
      ctx: this.ctx,
      sprite: this.sprite,
    })
    this.score = new Score({
      ctx: this.ctx,
      cvs: this.cvs,
    })
    this.bird = new Bird({
      ctx: this.ctx,
      cvs: this.cvs,
      sprite: this.sprite,
    })

    this.initSocket()
    this.cvs.ontouchstart = this.handleGameControl
    this.cvs.addEventListener('click', this.handleGameControl)
    document.addEventListener('keydown', this.handleKeyboardPress)
  }

  destroy() {
    document.removeEventListener('keydown', this.handleKeyboardPress)
  }
}

export default Game
