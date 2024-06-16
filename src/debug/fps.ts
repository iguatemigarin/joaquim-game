import { ctx } from '../render/canvas'
import { Renderable } from '../render/renderable'

const UPDATE_FREQUENCY = 2 // in Hz

export class FPS extends Renderable {
  tock: number = Date.now()
  now: number = Date.now()
  msSinceLastCount: number = 0
  framesInS: number = 0
  text: string = ''

  init() {}

  loop(timePassed: number) {
    this.render()
  }

  render() {
    this.updateNow()
    this.updateMsSinceLastCount()

    if (this.shouldResetFPSCounter()) {
      this.resetFPSCounter()
    }

    this.incrementFPSCounter()
    this.updateTick()
    this.drawText()
  }

  updateNow() {
    this.now = Date.now()
  }

  updateMsSinceLastCount() {
    this.msSinceLastCount += this.now - this.tock
  }

  updateTick() {
    this.tock = this.now
  }

  shouldResetFPSCounter() {
    return this.msSinceLastCount >= 1000 / UPDATE_FREQUENCY
  }

  resetFPSCounter() {
    this.text = (this.framesInS * UPDATE_FREQUENCY).toString() + 'fps'
    this.msSinceLastCount = 0
    this.framesInS = 0
  }

  incrementFPSCounter() {
    this.framesInS++
  }

  drawText() {
    ctx.font = '24px sans-serif'
    ctx.fillText(this.text, 10, 50)
  }
}
