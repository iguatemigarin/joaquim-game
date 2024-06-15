import { Vector } from '../math'

export type WorldEntityOptions = {
  mass?: number
  center?: Vector
  velocity?: Vector
  acceleration?: Vector
}

export class WorldEntity {
  id: string
  mass: number
  center: Vector
  velocity: Vector
  acceleration: Vector

  constructor(id: string, options: WorldEntityOptions) {
    this.id = id + '-world-entity'
    this.mass = options?.mass || 0
    this.center = options?.center || new Vector()
    this.velocity = options.velocity || new Vector()
    this.acceleration = options.acceleration || new Vector()
  }
  update(timePassed: number) {
    const deltaAcceleration = new Vector(
      this.acceleration.x,
      this.acceleration.y,
    )
    deltaAcceleration.multiply(timePassed)

    this.velocity.add(deltaAcceleration)
    this.center.add(this.velocity)
  }
}
