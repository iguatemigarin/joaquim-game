import { canvas, ctx } from './render/canvas.ts'
import { Vector } from './math.ts'
import { Renderable } from './render/renderable.ts'

const parts = 100
const ratio = 16 / 9

export class Stage implements Renderable {
  unit: number = 1
  width: number = canvas.width
  height: number = canvas.height
  origin: Vector = new Vector()

  constructor(
    public id: string,
    public children: Renderable[] = [],
  ) {}

  render() {
    this.updateOrigin()
    this.updateDimentions()
    this.updateUnitsScale()
    this.drawRect()
    this.children.forEach((r) => r.render(this))
  }

  updateUnitsScale() {
    this.unit = this.width / parts
  }

  updateDimentions() {
    const { width, height } = canvas

    this.width = height * ratio
    this.height = height

    if (this.width > width) {
      this.width = width
      this.height = width / ratio
    }
  }

  updateOrigin() {
    this.origin = new Vector(
      canvas.width / 2 - this.width / 2,
      canvas.height / 2 - this.height / 2,
    )
  }

  drawRect() {
    ctx.translate(this.origin.x, this.origin.y)

    ctx.strokeRect(0, 0, this.width, this.height)

    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }

  addChild(child: Renderable) {
    this.children.push(child)
  }
}
