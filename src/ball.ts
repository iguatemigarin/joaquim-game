import { ctx as globalCtx } from './render/canvas'
import { Renderable } from './render/renderable'
import { Stage } from './stage'
import { WorldEntity, WorldEntityOptions } from './physics/world-entity'
import { Vector } from './math'

export class Ball extends Renderable {
  children: Renderable[]
  physics: WorldEntity
  private ctx: CanvasRenderingContext2D

  constructor(
    private stage: Stage,
    public id: string,
    public radius: number = 1,
    public color: string = 'red',
    private physicsOptions: WorldEntityOptions,
    ctx: CanvasRenderingContext2D = globalCtx,
  ) {
    const thisId = id + '-ball'
    super(thisId, stage)
    this.stage = stage
    this.id = thisId
    this.physics = new WorldEntity(this.id, {
      ...this.physicsOptions,
      mass: 1,
      velocity: new Vector(0, -1),
      acceleration: new Vector(0, 0.005),
    })
    this.ctx = ctx
  }

  loop(timePassed: number): void {
    this.physics.update(timePassed)
    this.render()
    if (this.physics.center.y >= 100 - this.radius * 2) {
      this.destroy()
    }
  }

  render() {
    this.ctx.translate(this.stage.origin.x, this.stage.origin.y)
    this.ctx.beginPath()
    this.ctx.arc(
      this.physics.center.x * this.stage.xUnit,
      this.physics.center.y * this.stage.yUnit,
      this.radius * this.stage.xUnit,
      0,
      2 * Math.PI,
    )
    // set fill color
    this.ctx.fillStyle = this.color
    this.ctx.fill()
    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
  }
}
