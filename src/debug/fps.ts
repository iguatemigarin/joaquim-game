import { ctx } from '../render/canvas.ts'
import { Renderable } from '../render/renderable.ts'

const UPDATE_FREQUENCY = 2 // in Hz

export class FPS implements Renderable {
  tick: number = Date.now()
  now: number = Date.now()
  msSinceLastCount: number = 0
  framesInS: number = 0
  text: string = ''

  constructor(public id: string) {}

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
    this.msSinceLastCount += this.now - this.tick
  }

  updateTick() {
    this.tick = this.now
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
