import { canvas, ctx } from './render/canvas'
import { Vector } from './math'
import { Renderable } from './render/renderable'
import { Ball } from './ball'

const parts = 100
const ratio = 16 / 9

export class Stage extends Renderable {
  xUnit: number = 1
  yUnit: number = 1
  width: number = canvas.width
  height: number = canvas.height
  origin: Vector = new Vector()

  constructor(
    public id: string,
    public children: Renderable[] = [],
  ) {
    super(id)
    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const { x: sx, y: sy } = this.screenToStage(x, y)

      this.addChild(
        new Ball('ball one', 1, 'blue', {
          center: new Vector(sx, sy),
        }),
      )
      console.log(sx, sy)
    })
  }

  render() {
    this.updateOrigin()
    this.updateDimentions()
    this.updateUnitsScale()
    this.drawRect()
    this.children.forEach((r) => r.render(this))
  }

  updateUnitsScale() {
    this.xUnit = this.width / parts
    this.yUnit = this.height / parts
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

  screenToStage(x: number, y: number) {
    return {
      x: ((x - this.origin.x) / this.width) * parts,
      y: ((y - this.origin.y) / this.height) * parts,
    }
  }
}
