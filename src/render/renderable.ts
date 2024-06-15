import { WorldEntity } from '../physics/world-entity.ts'

export abstract class Renderable {
  id: string
  children: Renderable[]
  parent?: Renderable
  physics?: WorldEntity

  constructor(id: string, parent?: Renderable, physics?: WorldEntity) {
    this.id = id
    this.parent = parent
    this.children = []
    this.physics = physics
  }
  abstract render(): void
  abstract loop(timePassed: number): void

  tick(timePassed: number) {
    this.loop(timePassed)

    if (this.children) {
      this.children.forEach((child) => {
        child.tick(timePassed)
      })
    }
  }

  destroy() {
    if (!this.parent) {
      throw new Error('Cannot destroy rendenralbe without parent')
      return
    }

    this.parent.children = this.parent.children.filter(
      (child) => child !== this,
    )
  }
}
