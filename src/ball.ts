import { ctx } from './render/canvas'
import { Renderable } from './render/renderable'
import { Stage } from './stage'
import { WorldEntity, WorldEntityOptions } from './physics/world-entity'

export class Ball implements Renderable {
  children: Renderable[]
  physics: WorldEntity

  constructor(
    public id: string,
    public radius: number = 1,
    public color: string = 'red',
    physics?: WorldEntityOptions,
  ) {
    this.id = id + '-ball'
    this.physics = new WorldEntity(this.id, {
      ...physics,
    })
  }

  render(stage: Stage) {
    ctx.translate(stage.origin.x, stage.origin.y)
    ctx.beginPath()
    ctx.arc(
      this.physics.center.x * stage.xUnit,
      this.physics.center.y * stage.yUnit,
      this.radius * stage.xUnit,
      0,
      360,
    )
    // set fill color
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }
}
